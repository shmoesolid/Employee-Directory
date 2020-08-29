import axios from "axios";

export default {
  getUsers: function(num=30) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://randomuser.me/api/?results="+num)
        .then(res => {
          const users = res.data.results;
          const results = users.map(user => {
            return {
              name: user.name.first +" "+ user.name.last,
              age: user.dob.age,
              email: user.email,
              phone: user.phone,
              cell: user.cell,
              image: user.picture.thumbnail
            };
          });
          resolve(results);
        })
        .catch(err => reject(err));
    });
  },
};