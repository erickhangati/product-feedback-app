import * as Yup from 'yup';

export const categoryOptions = [
  { key: 'Select option', value: '' },
  { key: 'UI', value: 'ui' },
  { key: 'UX', value: 'ux' },
  { key: 'Enhancement', value: 'enhancement' },
  { key: 'Bug', value: 'bug' },
  { key: 'Feature', value: 'feature' },
];

export const statusOptions = [
  { key: 'Suggestion', value: 'suggestion' },
  { key: 'Planned', value: 'planned' },
  { key: 'In Progress', value: 'in-progress' },
  { key: 'Live', value: 'live' },
];

export interface FeedbackValues {
  _id?: string;
  title: string;
  category: string;
  description: string;
  status?: string;
}

export const feedbackInitialValues: FeedbackValues = {
  title: '',
  category: '',
  description: '',
  status: '',
};

export const feedbackValidationSchema = Yup.object({
  title: Yup.string().required('Required!'),
  category: Yup.string().required('Required!'),
  description: Yup.string().required('Required!'),
  status: Yup.string(),
});

export interface LoginValues {
  email: string;
  password: string;
}

export const loginInitialValues: LoginValues = {
  email: '',
  password: '',
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email!').required('Required'),
  password: Yup.string().required('Required!'),
});

export interface CommentValues {
  comment: string;
}

export const commentInitialValues: CommentValues = {
  comment: '',
};

export const commentValidationSchema = Yup.object({
  comment: Yup.string()
    .required('Required!')
    .max(225, 'Exceeded character limit'),
});

export interface ReplyValues {
  reply: string;
}

export const replyInitialValues: ReplyValues = {
  reply: '',
};

export const replyValidationSchema = Yup.object({
  reply: Yup.string().required('Required!'),
});
