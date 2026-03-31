"use client"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../app/styles/loading.css"
import { FaUser, FaEnvelope, FaGraduationCap, FaIdBadge } from "react-icons/fa";

export default function Form() {

    const campNames = {
        "157": "Web Summer Camp",
        "163": "Web Spring Camp",
        "222": "Web Abo Qire Course"
    }
    const successColor = "#28a745",
        failColor = "#e74c3c";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        camp: ""
    })

    const [message, setMessage] = useState({
        nameMessage: "",
        emailMessage: "",
        campMessage: ""
    })

    const [flag, setFlag] = useState({
        nameFlag: false,
        emailFlag: false,
        campFlag: false
    })

    const [touch, setTouch] = useState({
        nameTouch: false,
        emailTouch: false,
        campTouch: false
    })
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState(null);
    const [userApproved, setUserApproved] = useState(null);
    useEffect(() => {


        if (touch.nameTouch) {
            const checkFullName = formData.name.trim().split(" ").length >= 2;

            if (!formData.name.trim()) {
                setMessage(prev => ({ ...prev, nameMessage: "Name is required" }))
                setFlag(prev => ({ ...prev, nameFlag: false }))
            } else if (!checkFullName) {
                setMessage(prev => ({ ...prev, nameMessage: "Full name must be at least 2 words" }))
                setFlag(prev => ({ ...prev, nameFlag: false }))
            } else {
                setMessage(prev => ({ ...prev, nameMessage: "Full name is valid" }))
                setFlag(prev => ({ ...prev, nameFlag: true }))
            }
        }

        if (touch.emailTouch) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formData.email.trim()) {
                setMessage(prev => ({ ...prev, emailMessage: "Email is required" }))
                setFlag(prev => ({ ...prev, emailFlag: false }))
            } else if (!emailRegex.test(formData.email)) {
                setMessage(prev => ({ ...prev, emailMessage: "Invalid email" }))
                setFlag(prev => ({ ...prev, emailFlag: false }))
            } else {
                setMessage(prev => ({ ...prev, emailMessage: "Email is valid" }))
                setFlag(prev => ({ ...prev, emailFlag: true }))
            }
        }


        if (touch.campTouch) {
            if (!formData.camp) {
                setMessage(prev => ({ ...prev, campMessage: "Please select a camp" }))
                setFlag(prev => ({ ...prev, campFlag: false }))
            } else {
                setMessage(prev => ({ ...prev, campMessage: "Camp is valid" }))
                setFlag(prev => ({ ...prev, campFlag: true }))
            }
        }

    }, [formData, touch])
    useEffect(() => {
        const checkSession = async () => {
            const res = await fetch("https://sphinx-id-wtp1.vercel.app/", {
                method: "GET",
                credentials: "include",
                cache: "no-store"
            });
            const data = await res.json();
            setUser({ ...data })
        }
        checkSession();
    }, [])
    useEffect(() => {
        const checkUser = async () => {
            const res = await fetch("https://sphinx-id-wtp1.vercel.app/student-is-approved", {
                method: "GET",
                credentials: "include",
                cache: "no-store"
            });
            const data = await res.json();
            setUserApproved({ ...data })
        }
        checkUser();
    }, [])
    const allTrue = Object.values(flag).every(value => value === true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoad(true);

            const names = formData.name.trim().split(" ");

            const finalID =
                names[0].slice(-1) +
                (names[1]?.[0]) +
                formData.email.slice(0, 3) +
                formData.camp;

            const res = await fetch("https://sphinx-id-wtp1.vercel.app/apply", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    camp: formData.camp,
                    finalID: finalID
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    data.errors.forEach(err => toast.error(err.msg));
                } else {
                    toast.error(data.message || "Failed to submit application");

                }
                setLoad(false);
                return;
            }

            toast.success(data.message || "Application submitted successfully");
            if (data.redirect) {
                window.location.href = data.redirect;
                return;
            }
            setLoad(false);

            setFormData({ name: "", email: "", camp: "" });
            setTouch({ nameTouch: false, emailTouch: false, campTouch: false });
            setFlag({ nameFlag: false, emailFlag: false, campFlag: false });
            setMessage({ nameMessage: "", emailMessage: "", campMessage: "" });


        } catch (error) {
            console.error(error);
            toast.error("Server error");
            setLoad(false);
        }
    };
    if (user === null || userApproved === null) {

        return <div className='loading_page'>
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    }


    if (user.logged && (!userApproved || !userApproved.approved)) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-90px)] w-full flex-col " >
                <h1 className="bg-[#00000044] w-fit p-[20px]! block! mx-auto! text-center font-thin text-white text-[25px] rounded-t-[20px] border-b-[3px] border-solid border-[#3b6df0] mb-[70px]!" data-aos="fade-up">
                    Sphinx
                </h1>
                <h1 className="text-white text-[20px] font-bold mb-4 drop-shadow-lg" data-aos="fade-up">
                    We will reply within 48 hours
                </h1>
                <p className="text-white/70 text-[14px] text-center p-[10px]!" data-aos="fade-down">
                    Thanks || Eng.<span className="text-[#1877F2] font-black capitalize">{user.data.name}</span> for reaching out! HR Staff will get back to you as soon as possible.
                </p>
            </div>
        );
    } else if (user.logged && userApproved && userApproved.approved) {
        return (
            <div className=" flex justify-center items-center min-h-[calc(100vh-90px)] w-full">
                <div className="data bg-[#00000044] w-[60%] h-auto rounded-[20px] p-[10px]!">

                    <div className=" p-5 text-center">
                        <h2 className="text-xl font-semibold text-[#1877F2]">
                            Application Status
                        </h2>
                        <p className="text-sm text-green-600 mt-1 font-medium">
                            Approved
                        </p>
                    </div>

                    <div className="p-5 flex flex-col gap-4  h-[100%]">

                        <div className="info flex items-center justify-between text-[#fff]  h-[50px]">
                            <div className="flex items-center gap-2 text-[#fff]">
                                <FaUser />
                                <span>Name</span>
                            </div>
                            <span className="text-[#fff] font-medium">
                                {userApproved.results.name}
                            </span>
                        </div>

                        <div className="info flex items-center justify-between text-[#fff]  h-[50px]">
                            <div className="flex items-center gap-2 text-[#fff]">
                                <FaEnvelope />
                                <span>Email</span>
                            </div>
                            <span className="text-[#fff] font-medium">
                                {userApproved.results.email}
                            </span>
                        </div>

                        <div className="info flex items-center justify-between text-[#fff]  h-[50px]">
                            <div className="flex items-center gap-2 text-[#fff]">
                                <FaGraduationCap />
                                <span>Camp/Course</span>
                            </div>
                            <span className="text-[#fff] font-medium">
                                {campNames[userApproved.results.camp]}
                            </span>
                        </div>

                        <div className="info flex items-center justify-between text-[#fff]  h-[50px]">
                            <div className="flex items-center gap-2 text-[#fff]">
                                <FaIdBadge />
                                <span>Application ID</span>
                            </div>
                            <span className="text-[#fff] font-medium">
                                {userApproved.results.finalID}
                            </span>
                        </div>
                    </div>



                </div>
            </div>
        );
    }

    return (

        !user.logged && <div className="flex flex-col justify-center items-center min-h-[calc(100vh-90px)] w-full ">

            <h1 className="bg-[#00000044] w-fit p-[20px]! block! mx-auto! text-center font-thin text-white text-[25px] rounded-t-[20px] border-b-[3px] border-solid border-[#3b6df0] " data-aos="fade-up">
                Sphinx
            </h1>

            <form
                onSubmit={handleSubmit}
                className="rounded-[10px] flex justify-center items-center flex-wrap w-[50%] flex-col bg-[#00000044] py-[20px]! h-[75vh]"
            >


                <div className="text-[#fff] flex justify-center items-start flex-col gap-[10px] text-[14px] p-[10px]! w-[350px]" data-aos="fade-left">
                    <label className="block text-[#eee] mb-1 text-sm" style={{
                        color: touch.nameTouch
                            ? flag.nameFlag
                                ? successColor
                                : failColor
                            : "",
                    }}>Name *</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className={`w-full p-[10px]! rounded-[4px] bg-[#ffffff5b] block mx-auto border-[2px] `}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                        }}
                        onInput={() => {
                            setTouch({ ...touch, nameTouch: true })
                        }}
                        style={{
                            borderColor: touch.nameTouch
                                ? flag.nameFlag
                                    ? successColor
                                    : failColor
                                : "",
                        }}
                        name="name"
                        required
                        autoComplete="off"
                    />
                    <p className="text-red-400 text-sm" style={{
                        color: touch.nameTouch
                            ? flag.nameFlag
                                ? successColor
                                : failColor
                            : "",
                    }}>
                        {message.nameMessage}
                    </p>
                </div>


                <div className="text-[#fff] flex justify-center items-start flex-col gap-[10px] text-[14px] p-[10px]! w-[350px]" data-aos="fade-right">
                    <label className="block text-[#eee] mb-1 text-sm" style={{
                        color: touch.emailTouch
                            ? flag.emailFlag
                                ? successColor
                                : failColor
                            : "",
                    }}>Email *</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className={`w-full p-[10px]! rounded-[4px] bg-[#ffffff5b] block mx-auto border-[2px] `}
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                        }}
                        onInput={() => {
                            setTouch({ ...touch, emailTouch: true })
                        }}
                        style={{
                            borderColor: touch.emailTouch
                                ? flag.emailFlag
                                    ? successColor
                                    : failColor
                                : "",
                        }}
                        name="email"
                        required
                        autoComplete="off"
                    />
                    <p className="text-red-400 text-sm" style={{
                        color: touch.emailTouch
                            ? flag.emailFlag
                                ? successColor
                                : failColor
                            : "",
                    }}>
                        {message.emailMessage}
                    </p>
                </div>


                <div className="text-[#fff] flex justify-center items-start flex-col gap-[10px] text-[14px] p-[10px]! w-[350px]" data-aos="fade-left">
                    <label className="block text-[#eee] mb-1 text-sm" htmlFor="camp" style={{
                        color: touch.campTouch
                            ? flag.campFlag
                                ? successColor
                                : failColor
                            : "",
                    }}>Camp/Course *</label>
                    <select
                        name="camp"
                        id="camp"
                        className={`w-full p-[10px]! rounded-[4px] bg-[#ffffff5b] block mx-auto border-[2px]`}
                        onChange={(e) => {
                            setFormData({ ...formData, camp: e.target.value })
                            setTouch({ ...touch, campTouch: true })

                        }}
                        value={formData.camp}

                        style={{
                            borderColor: touch.campTouch
                                ? flag.campFlag
                                    ? successColor
                                    : failColor
                                : "",
                        }}
                        required
                        autoComplete="off"
                    >
                        <option value="">Select Camp</option>
                        <option value="157">Web Summer Camp</option>
                        <option value="163">Web Spring Camp</option>
                        <option value="222">Web Abo Qire Course</option>
                    </select>

                    <p className="text-red-400 text-sm" style={{
                        color: touch.campTouch
                            ? flag.campFlag
                                ? successColor
                                : failColor
                            : "",
                    }}>
                        {message.campMessage}
                    </p>
                </div>

                {
                    allTrue && (
                        !load ?
                            <button data-aos="fade-left"
                                className="no-underline p-[20px] rounded-[10px] text-[14px] font-medium bg-[#00000044] w-[120px] h-[40px] text-center flex justify-center items-center text-[#fff] cursor-pointer border-[1px] border-solid border-[#3b6df0] mt-[20px]!"
                                type="submit"
                            >
                                Apply
                            </button> :
                            <button
                                type="submit"
                                className="no-underline p-[20px] rounded-[10px] text-[14px] font-medium bg-gradient-to-r from-[#f4c153] to-[#3b6df0] w-[120px] h-[40px] text-center block m-auto! cursor-pointer flex  justify-center items-center "

                            >
                                <AiOutlineLoading3Quarters className="loading" />
                            </button>

                    )
                }

            </form>
            <ToastContainer autoClose={2000} />
        </div>
    )
}
