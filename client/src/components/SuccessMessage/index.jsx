import { useStateContext } from "../../context/ContextProvider";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SuccessMessage(props) {
    const { setShowSuccessModal } = useStateContext();
    const navigate = useNavigate();
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                {props.content}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-6 rounded-b">
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    navigate('/');
                                }}
                            >
                                Chấp nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default SuccessMessage;