"use client"
import Link from "next/link";
import Image from "next/image";
export default function Intro() {

  return (
    <>

      <section className="w-screen min-h-[calc(100vh-90px)] flex justify-center items-center">
        <main
          id="main"
          className="w-[550px] h-[460px] flex justify-center items-center flex-col gap-[80px] relative  rounded-[20px]"
          data-aos="fade-up"
        >
          <Image
            src={"/favicon.ico"}
            alt="Sphinx Society Logo"
            width={120}
            height={120}
            className="mt-[10px] opacity-[0.7]
"
          />
          <p
            className="text-[12px] text-[#eee] font-thin max-w-[50%] leading-[1.7] text-center
"
          >
            Welcome to the Sphinx Society. You matter to us, and we truly care about
            your journey. Keep going  you’re never alone here.
          </p>
          <Link
            href="/getID"
            className="no-underline rounded-[30px] text-[14px] font-medium bg-[#f4c153] w-[120px] h-[40px] text-center flex justify-center items-center text-[#fff] border-[1px] border-solid border-transparent"
          >
            Start
          </Link>
        </main>
     </section>
    </>
  )
}
