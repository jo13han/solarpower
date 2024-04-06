export default function Home() {
  return (
    <div className="relative w-full h-[90vh] flex flex-row justify-center">
            <video
        className="w-full absolute"
                muted={true}
                autoPlay={true}
        loop={true}
        preload="auto"
                src="/hero_video.mp4"
            ></video>
    <h1 className="text-8xl text-white absolute bottom-28 font-bold">Project Sunroof India</h1>
        </div>
  )
}
