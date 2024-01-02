const GET_PROFILE_DETAILS = `
query getDocs($type: String) {
    docs(where: {type: {_eq: $type}}) {
      id
      type
      content
      last_updated
    }
  }  
`;

const INSERT_USER_FEEDBACK = `
mutation Insert_Feedback($user_id: String!, $topic: String, $review: String, $rating: Int!) {
  insert_feedback(objects: {user_id: $user_id, topic: $topic, review_and_suggestion: $review, rating: $rating}) {
    returning {
      id
      user_id
    }
  }
}
`;

const GET_FEEDBACK = `
query GetFeedback($user_id: String!) {
  feedback(where: {user_id: {_eq: $user_id}}) {
    created_at
    id
    rating
    review_and_suggestion
    topic
    updated_at
    user_id
  }
}`;

const UPDATE_FEEDBACK = `mutation updateFeedback($user_id: String!, $rating: Int!, $review_and_suggestion: String, $updated_at: String!) {
  update_feedback(where: {user_id: {_eq: $user_id}}, _set: {rating: $rating, review_and_suggestion: $review_and_suggestion, updated_at: $updated_at}) {
    returning {
      user_id
      id
    }
  }
}`;

const INSERT_REPORT_ISSUE = `mutation SendFeedbackMail($user_id: String!, $comment: String!) {
  sendFeedback(arg1: {comment: $comment, entraId: $user_id}) {
    emailResult {
      code
      message
      status
      data {
        id
      }
    }
  }
}`;

export {
  GET_PROFILE_DETAILS,
  INSERT_USER_FEEDBACK,
  GET_FEEDBACK,
  UPDATE_FEEDBACK,
  INSERT_REPORT_ISSUE,
};
