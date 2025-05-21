from rest_framework import status, views
from rest_framework.response import Response
from .models import Memory
from .serializers import MemorySerializer, UserSignupSerializer
from .services import Trie, PriorityQueue
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class SignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Initialize services
tag_trie = Trie()
reaction_queue = PriorityQueue()

def initialize_data_structures():
    if not tag_trie.root.children:
        all_memories = Memory.objects.all()
        for memory in all_memories:
            for tag in memory.tags:
                tag_trie.insert(tag)
    
    if not reaction_queue.queue:
        all_memories = Memory.objects.all()
        for memory in all_memories:
            if "🥲" in memory.reactions and memory.reactions["🥲"] > 0:
                reaction_queue.rebalance(memory.id, memory.reactions["🥲"])

class MemoryCreateView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MemorySerializer(data=request.data)
        if serializer.is_valid():
            memory = serializer.save(author=request.user)
            initialize_data_structures()
            
            for tag in memory.tags:
                tag_trie.insert(tag)
            
            if "🥲" in memory.reactions and memory.reactions["🥲"] > 0:
                reaction_queue.rebalance(memory.id, memory.reactions["🥲"])
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MemoryListView(views.APIView):
    def get(self, request):
        initialize_data_structures()
        tag = request.query_params.get('tag')
        
        if tag:
            matching_tags = tag_trie.autocomplete(tag)
            print(f"Matching tags for '{tag}': {matching_tags}")
            if not matching_tags:
                return Response({"error": "No matching tags found", "memories": MemorySerializer([], many=True).data, "top_homesick_posts": MemorySerializer([], many=True).data }, )
            
            all_memories = Memory.objects.all().order_by('-created_at')
            memories = []
            for memory in all_memories:
                if any(tag in memory.tags for tag in matching_tags):
                    memories.append(memory)
            
            top_homesick_posts = self._get_top_homesick_posts(matching_tags)
        else:
            memories = Memory.objects.all().order_by('-created_at')
            top_homesick_posts = self._get_top_homesick_posts()
            
        serializer = MemorySerializer(memories, many=True)
        return Response({
            "memories": serializer.data,
            "top_homesick_posts": MemorySerializer(top_homesick_posts, many=True).data
        })
    
    def _get_top_homesick_posts(self, matching_tags=None):
        top_posts = []
        seen_memory_ids = set()
        
        for _, memory_id in reaction_queue.queue:
            if memory_id not in seen_memory_ids:
                try:
                    memory = Memory.objects.get(id=memory_id)
                    if matching_tags and not any(tag in memory.tags for tag in matching_tags):
                        continue
                    top_posts.append(memory)
                    seen_memory_ids.add(memory_id) 
                except Memory.DoesNotExist:
                    continue  

        return top_posts[:3]

class MemoryReactView(views.APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, memory_id):
        try:
            memory = Memory.objects.get(id=memory_id)
        except Memory.DoesNotExist:
            return Response({"error": "Memory not found"}, status=status.HTTP_404_NOT_FOUND)
        
        reaction = request.data.get('reaction')
        if reaction:
            memory.reactions[reaction] = memory.reactions.get(reaction, 0) + 1
            memory.save()

            if reaction == "🥲":
                reaction_queue.rebalance(memory.id, memory.reactions["🥲"])

            return Response({"message": "Reaction updated"})
        return Response({"error": "Reaction type missing"}, status=status.HTTP_400_BAD_REQUEST)

class MemoryDeleteView(views.APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, memory_id):
        try:
            memory = Memory.objects.get(id=memory_id)
        except Memory.DoesNotExist:
            return Response({"error": "Memory not found"}, status=status.HTTP_404_NOT_FOUND)
        
        for tag in memory.tags:
            tag_trie.delete(tag)
        
        if "🥲" in memory.reactions and memory.reactions["🥲"] > 0:
            reaction_queue.remove(memory.id)

        memory.delete()
        return Response({"message": "Memory deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
