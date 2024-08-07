import { XCircleIcon } from "@heroicons/react/24/outline";

export const Modal = ({
    children,
    onClose,
}: {
    children: React.ReactNode;
    onClose: () => void;
}) => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-100/75 p-2 flex flex-col justify-center">
            <div className="bg-white rounded-lg relative h-fit my-auto w-full p-4 shadow-xl">
                <XCircleIcon
                    className="absolute h-6 w-6 text-black right-1 top-1"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    );
};
