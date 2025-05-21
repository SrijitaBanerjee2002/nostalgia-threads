## Notes for Week 13

### Overview:
**When:** April 15, 2025  
**Duration:** 1 hr  
**Where:** Discord

### Attendance
**Late:** None  
**Missing:** N/A

### Recent Progress:
- **Backend & Core API**  
  - Profile model design finalized (one-to-one to User with `display_name` & `region`)  
  - JWT-based signup/login flow agreed (endpoints drafted)  
- **Frontend Setup**  
  - Vite+React+TS scaffold up and running locally  
  - Stub pages created: Feed, About, Sign-Up, Login  
  - Env vars (`VITE_BACKEND_URL`) and TS shims (`global.d.ts`) installed so the team can boot the app without errors  
- **New Feature Prototyping**  
  - Began local prototype of audio/video/picture attachments on MemoryCard component  
  - Drafted initial color-scheme variations to refresh the app’s look  
  - Writing and running test cases locally to validate media upload and playback logic  


### Issues Encountered:
- Audio/video prototype hitting minor implementation errors—tests failing, so not yet pushed to GitHub  
- Color-scheme changes still in draft form; need to settle on final palette  
- A handful of TS import errors remain around React globals  

### Action Items (Work In Progress):
- Continue refining memory-card media logic and get local tests passing  
- Finalize color palette and integrate into Tailwind config  
- When tests are stable, commit audio/video feature and color updates  
