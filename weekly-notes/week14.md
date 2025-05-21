## Notes for Week 14

### Overview:
**When:** April 22, 2025  
**Duration:** 1 hr  
**Where:** Zoom

### Attendance
**Late:** None  
**Missing:** N/A

### Recent Progress:
- **Backend & Auth**  
  - Profile model created and migrations applied  
  - `/api/signup` and `/api/login` endpoints live with JWT issuance  
- **Frontend & Media Feature**  
  - AuthContext wired to store JWT in `localStorage`  
  - Sign-Up/Login forms hooked to real endpoints, with basic error feedback  
  - Continued development of MemoryCard media fields (audio/video/picture) in local branch  
  - Refining color-scheme prototypes and testing CSS variable integration in progress (locally)
  - Expanding unit tests for media rendering logic in MemoryCard in progress (locally)  

### Issues Encountered:
- Backend media-upload support not yet in place, so end-to-end isn’t fully testable  
- Some media tests still failing due to missing API mocks  
- Color scheme CSS occasionally causes layout shifts that need adjustment   

### Action Items (Work In Progress):
- Coordinate with backend to add media URL fields and upload support  
- Fix and extend media feature tests, then merge into main repo once green  
- Solidify and apply the final color scheme across all pages
- Draft more intricate test cases highlighting functionality of the product and commit them all together.
 
