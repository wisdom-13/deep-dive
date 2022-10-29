import React, { memo, useCallback, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';

export default function AppMentor() {
  const [person, updatePerson] = useImmer(initialPerson);

  const handleUpdate = useCallback(() => () => {
    const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
    const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);

    updatePerson((person) => {
      const mentor = person.mentors.find((m) => m.name === prev);
      mentor.name = current;
    })
  })

  const handleAdd = useCallback(() => {
    const addName = prompt(`추가할 멘토의 이름을 입력하세요.`);
    const addTitle = prompt(`추가할 멘토의 타이틀을 입력하세요.`);

    updatePerson((person) => {
      person.mentors.push({ name: addName, title: addTitle });
    })
  })

  const handleDelete = useCallback(() => {
    const delName = prompt(`삭제할 멘토의 이름을 입력하세요.`);

    updatePerson((person) => {
      const index = person.mentors.findIndex((m) => m.name === delName);
      person.mentors.splice(index, 1)
    })
  })

  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>{person.name}의 멘토는:</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title})
          </li>
        ))}
      </ul>
      <Button text="멘토의 이름을 바꾸기" onClick={handleUpdate}></Button>
      <Button text="멘토 추가하기" onClick={handleAdd}></Button>
      <Button text="멘토 삭제하기" onClick={handleDelete}></Button>
    </div>
  );
}

const Button = memo(({ text, onClick }) => {
  console.log('Button', text, 're-rendering 😜');
  const result = useMemo(() => calculateSomething(), []);
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '20px',
        margin: '0.4rem',
      }}
    >
      {`${text} ${result}`}
    </button>
  );
});

function calculateSomething() {
  for (let i = 0; i < 10000; i++) {
    console.log("A");
  }
  return 10;
}

const initialPerson = {
  name: '엘리',
  title: '개발자',
  mentors: [
    {
      name: '밥',
      title: '시니어개발자',
    },
    {
      name: '제임스',
      title: '시니어개발자',
    },
  ],
}