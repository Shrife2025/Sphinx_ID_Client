import { FaFacebook, FaTiktok, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className=" h-[90px] bg-[#00000044] flex justify-center items-center gap-[20px] w-screen! ">
            <div className="flex justify-center items-center flex-col gap-[20px]">
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0 gap-5">
                    <li>
                        <a
                            href="https://www.facebook.com/share/1AjdxYJyhP/?mibextid=wwXIfr"
                            target="_blank"
                            className="hover:text-blue-500 transition-colors"
                        >
                            <FaFacebook
                                size={22}
                                style={{
                                    color: "#1877F2",
                                    background: "white",
                                    borderRadius: "50%",
                                }}
                            />
                        </a>
                    </li>
                    x
                    <li>
                        <a
                            href="https://www.tiktok.com/@sta_aast?_r=1&_t=ZS-93doX80nyQK"
                            target="_blank"
                            className="hover:text-gray-400 transition-colors"
                        >
                            <FaTiktok size={22} />
                        </a>
                    </li>
                    x
                    <li>
                        <a
                            href="https://www.instagram.com/sphinx.aast?igsh=eHZyMzFsZmg3Yjhs&utm_source=qr"
                            target="_blank"
                            className="hover:text-blue-700 transition-colors"
                        >
                            <FaInstagram
                                size={22}

                            />
                        </a>
                    </li>
                    x
                    <li>
                        <a
                            href="https://www.youtube.com/@Sphinx-Technical-Allience"
                            target="_blank"
                            className="hover:text-red-600 transition-colors"
                        >
                            <FaYoutube size={22} style={{ color: "red" }} />
                        </a>
                    </li>
                </ul>
                <span className="text-[15px] text-[#fff]">
                    © 2026{" "}
                    <a href="https://flowbite.com/" className="hover:underline">
                        Created by <span className="text-[#f4c153]">PAC Team </span>
                    </a>
                </span>
            </div>
        </footer>
    );
}
