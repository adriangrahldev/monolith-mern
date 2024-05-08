import React from 'react';
import Image from 'next/image';
import { Comment } from '@/interfaces/comment';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommentsPanelProps {
    comments: Comment[] | undefined;
    user: any | null;
    onSubmit: (content: string) => void;
}

const CommentsPanel: React.FC<CommentsPanelProps> = ({ comments, user, onSubmit }) => {
    return (
        <div id="comments">
            {comments?.length ? (
                comments.map((comment) => (
                    <div
                        key={comment._id}
                        className={`flex items-center gap-4 p-1 mb-1 rounded-lg px-2  ${comment?.admin ? '' : 'bg-slate-100'}`}
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
                                    <h1 className="text-md font-bold">{comment.author?.charAt(0)}</h1>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col -space-y-1">
                                <p className="text-xs text-gray-400">
                                    {moment(comment.createdAt).format('MMM DD, YYYY hh:mm a')}
                                </p>
                                <h2 className="font-bold text-md">
                                    {comment.author || 'Unknown Name'}
                                </h2>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
            <form
                className="flex gap-2 items-center mt-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    const content = e.currentTarget.content.value;
                    onSubmit(content);
                    e.currentTarget.reset();
                }}
            >
                <Input
                    type="text"
                    name="content"
                    placeholder="Write a comment..."
                    required
                />
                <Button
                    variant="default"
                    type="submit"

                >
                    Comment
                </Button>
            </form>
        </div>
    );
};


export default CommentsPanel;
