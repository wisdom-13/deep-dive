export default function personReducer(person, action) {
  switch (action.type) {
    case 'update': {
      const { prev, current } = action;
      return {
        ...person,
        mentors: person.mentors.map((mentor) => {
          if (mentor.name == prev) {
            return { ...mentor, name: current }
          }
          return mentor;
        })
      }
    }

    case 'add': {
      const { addName, addTitle } = action;
      return {
        ...person,
        mentors: [...person.mentors, { name: addName, title: addTitle }]
      }
    }

    case 'delete': {
      const { delName } = action;
      return {
        ...person,
        mentors: person.mentors.filter((mentor) => mentor.name != delName)
      }
    }
    default: {
      throw Error(`알 수 없는 액션 타입입니다: ${action.type}`);
    }
  }
}