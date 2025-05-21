class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        
    def autocomplete(self, prefix):
        node = self.root
        for char in prefix:
            print(char)
            if char not in node.children:
                return []
            node = node.children[char]
        
        return self._find_words(node, prefix)
        
    def _find_words(self, node, prefix):
        words = []
        if node.is_end_of_word:
            words.append(prefix)
        for char, child_node in node.children.items():
            words.extend(self._find_words(child_node, prefix + char))
        return words
        
    def delete(self, word):
        self._delete_recursive(self.root, word, 0)
        
    def _delete_recursive(self, node, word, index):
        if index == len(word):
            if node.is_end_of_word:
                node.is_end_of_word = False
            return len(node.children) == 0 
        char = word[index]
        if char not in node.children:
            return False
        can_delete_child = self._delete_recursive(node.children[char], word, index + 1)
        if can_delete_child:
            del node.children[char]
            return len(node.children) == 0
        return False

class PriorityQueue:
    def __init__(self):
        self.queue = []

    def rebalance(self, memory_id, homesick_count):
        self.queue.append((homesick_count, memory_id))
        self.queue.sort(reverse=True)

    def remove(self, memory_id):
        self.queue = [item for item in self.queue if item[1] != memory_id]
        self.queue.sort(reverse=True)
