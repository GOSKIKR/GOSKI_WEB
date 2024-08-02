import { useMutation } from 'react-query';
import axios from 'axios';

export const useUploadFile = () => {
  return useMutation(async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  });
};
