import React, { useEffect } from "react";
import Image from "next/image";
import { Comment } from "@/interfaces/comment";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface CommentsPanelProps {
    comments: Comment[] | undefined;
    user: any | null;
    onSubmit: (content: string) => void;
    toggleCommentsPanel: () => void;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({
    comments,
    user,
    onSubmit,
    toggleCommentsPanel,
}) => {

    const handleLocalOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const content = e.currentTarget.content.value;
        onSubmit(content);
        e.currentTarget.reset();
    }

    useEffect(() => {
        document.getElementById("comments-container")?.scrollTo(
            0,
            document.getElementById("comments-container")?.scrollHeight || 0
        )
    }, [comments]);

    return (
        <div id="comments-container" className="fixed h-screen w-1/3 max-lg:w-screen right-0 top-0 overflow-y-auto rounded-none bg-white shadow-2xl z-50">
            <div className="h-full w-full relative">
                <div className="fixed w-1/3 max-lg:w-screen h-16 p-3 flex justify-between items-center border-b-2 bg-white">
                    <h1 className="text-xl font-bold">Comments</h1>
                    <Button onClick={toggleCommentsPanel} size={"sm"} variant={"outline"}>
                        <FontAwesomeIcon icon={faClose} />
                    </Button>
                </div>
                <div id="comments" className="flex flex-col mb-16  p-3 py-24">
                    {comments?.length ? (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className={`flex items-center gap-4 p-1 mb-1 rounded-lg  ${
                                    comment?.admin ? "" : "bg-slate-100"
                                }`}
                            >
                                <div className="w-8 h-8 bg-gray-200 rounded-full">
                                    {user?.picture ? (
                                        <Image
                                            src={user?.picture}
                                            alt="avatar"
                                            className="w-full h-full rounded-full"
                                            width={64}
                                            height={64}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <h1 className="text-md font-bold">
                                                {comment.author?.charAt(0)}
                                            </h1>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col -space-y-1">
                                        <p className="text-xs text-gray-400">
                                            {moment(comment.createdAt).format("MMM DD, YYYY hh:mm a")}
                                        </p>
                                        <h2 className="font-bold text-md">
                                            {comment.author || "Unknown Name"}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
                <div className="fixed bottom-0 right-0 w-1/3 max-lg:w-screen bg-white border-t-2 h-fit p-4">
                    <form
                    className="flex items-center h-fit gap-2"
                        onSubmit={(e) => handleLocalOnSubmit(e)}
                    >
                        <Input
                            type="text"
                            name="content"
                            placeholder="Write a comment..."
                            required
                        />
                        <Button variant="default" type="submit">
                            <FontAwesomeIcon icon={faPaperPlane}  />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentsPanel;
