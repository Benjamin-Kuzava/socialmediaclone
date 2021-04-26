import { useState, useContext } from 'react';
import Proptypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // new array of new comment obj && old comments
    setComments([{ displayName, comment }, ...comments]);
    setComment('');
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) => (comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault())}
      >
        <input
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
        />
        <button
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: Proptypes.string.isRequired,
  comments: Proptypes.array.isRequired,
  setComments: Proptypes.func.isRequired,
  commentInput: Proptypes.object
};
