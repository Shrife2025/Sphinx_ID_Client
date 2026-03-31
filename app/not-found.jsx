"use client";
import Image from "next/image";
import "./styles/error.css";
import Link from "next/link";
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
   if(window.history.length>1){
    router.back();
   }else
    router.push("/")
  };

  return (
    <main>
      <div className="info">
        <h2 className="subtitle">Sorry, Page Not Found</h2>

        <h1>
          4 <span>0</span> 4
        </h1>
        <p>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="links">
          <Link href="/">
            <FaHome /> Main
          </Link>
          <button type="button" onClick={handleBack}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
