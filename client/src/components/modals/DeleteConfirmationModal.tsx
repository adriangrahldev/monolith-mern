import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, CardHeader } from "../ui/card"



export const DeleteConfirmationModal = ({
    show,
    toggle,
    onDelete,
    name,
    type,
}: {
    show: boolean;
    toggle: () => void;
    onDelete: () => void;
    name: string;
    type: string;

}) => {
    return show ? (<div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-10">
        <div className="fixed w-screen h-screen bg-black opacity-50"></div>
        <Card className="z-50 w-1/4 shadow-xl animate-zoom">
            <CardHeader>
                <h1 className="font-bold text-xl">Confirm Deletion</h1>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 mb-4">
                    Are you sure you want to delete this {type}: <strong>{name}</strong>?
                </p>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={toggle}
                        className="bg-gray-200 text-black rounded-md p-2 px-4 focus:outline-none hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onDelete();
                            toggle();
                        }}
                        className="bg-red-600 text-white rounded-md p-2 px-4 focus:outline-none hover:bg-red-700"
                    >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete
                    </button>
                </div>
            </CardContent>
        </Card>
    </div>
    ) : null;
}
