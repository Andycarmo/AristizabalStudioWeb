export default function SectionBar({ title }) {
  return (
<section className="
  relative z-20
  w-full
  -translate-y-1/2
  md:-translate-y-2/3
  bg-gradient-to-r from-studio-green/50 to-studio-green/30
  backdrop-blur-md backdrop-saturate-150
  border-y border-white/10
  shadow-[0_4px_20px_rgba(0,0,0,0.25)]
">
      
      <div className="h-10 md:h-12 flex items-center justify-center">
        
        <h2 className="
          title-emboss
          font-cocomat 
          text-studio-pink 
          text-xl md:text-2xl lg:text-3xl 
          tracking-wide
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
        ">
          {title}
        </h2>

      </div>
    </section>
  );
}