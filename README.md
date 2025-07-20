# Metaverse-2D (OrbitOne)
<p align="center">
  <img src="https://i.ibb.co/ZpKCpB0b/orbitone.png" alt="My Image"/>
</p>
This is a simple attempt to recreate Gather - a platform where you can connect with multiple people via `websockets` and communicate with each other. Although I want to continue my work on this project, I'm constrained by time and other projects and learning, so I cannot commit myself fully to this. 

### Project Architecture
<img width="2148" height="828" alt="Untitled (1)" src="https://github.com/user-attachments/assets/ed1b5a47-99e7-4aa9-a549-1a4ad56b276c" />

Feel free to take a look at the code and contribute in any way you can. I would love to merge your PRs in this project. 
**Note: I still have to host this project on EC2**

#### What is working as of yet.
- Creation of user and the ability to select avatar and map of choice
- Creation of multiple spaces
- Websocket connection that allows you to connect more than 5 people in a single server (scaling websockets is expensive, and 5 is the peak limit at which my GPU used 100% of available VRAM)
- Map import - currently static for just one map called *Death Meadow* which is created using [Tiled Map Creator](https://www.mapeditor.org/) - which is an open-source software to create maps
- The map includes collisions for specific objects and the entire canvas is made using [PixiJS](https://pixijs.com/) - which is a 2D game engine for JavaScript based games for web.
### Future additions that I might add (if.)
- Simple WebRTC using `peerjs` such that people can also choose to communicate via video conferencing and VoIP.
- Addition of more user sprites (currently 1)
- Addition of more maps (currently 1)

**NOTE: I created this project to understand websockets, so it was never my intention to productionize it.**
