import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {addPost} from '../redux/modules/postReducer';
import styled from 'styled-components';

const FormContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    min-height: 600px; // !
    margin: 10px auto;
    background-color: #cac3c3;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 3rem;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block; // !
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #555;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box; // !!!!!!
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none; // !
    }
`;

const Textarea = styled.textarea`
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
    height: 250px; // !
    resize: none; // 크기조절 no
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none;
    }
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #8bae69;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    &:hover:not(:disabled) {
        background-color: #667f4c;
    }
`;

const CancelLink = styled(Link)`
    margin-top: 10px;
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
    text-align: center;
    &:hover {
        text-decoration: underline;
    }
`;


const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태

    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        // 제목이 10글자 이상이고, 내용이 비어있지 않으면 폼이 유효하다고 설정
        // setIsFormValid(title.length >= 10 && content.trim().length > 0);

        setIsFormValid(title.trim().length > 0 && content.trim().length > 0);
    }, [title, content]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.length < 10) {
            alert('제목은 10글자 이상이어야 합니다.');
            return;
        }

        const newPost = {
            title: title,
            content: content
        };

        dispatch(addPost(newPost));

        setTitle('');
        setContent('');
        navigate('/');
    };

    return (
        <FormContainer>
            <Title>게시물 추가</Title>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">제목</Label>
                    <Input
                        type="text"
                        id="title"
                        value={title}
                        placeholder="제목을 입력해주세요."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                        id="content"
                        value={content}
                        placeholder="내용을 입력해주세요."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FormGroup>
                <SubmitButton type="submit" disabled={!isFormValid}>
                    추가
                </SubmitButton>
                <CancelLink to="/">게시물 목록으로 돌아가기</CancelLink>
            </StyledForm>
        </FormContainer>
    );
};

export default AddPostForm;
