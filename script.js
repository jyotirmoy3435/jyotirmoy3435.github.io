async function search() {
  const searchTerm = document.getElementById('searchInput').value.toUpperCase();
  await displaySearchResult(searchTerm);
}

document.getElementById('searchInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    search();
  }
});

function sendMessage(roll_number) {
  let url = "https://faas-blr1-8177d592.doserverless.co/api/v1/namespaces/fn-8d688ca5-52c4-4096-a659-378b9e8e02f5/actions/sendMessages/sendSubjects?blocking=true&result=true";
  let data = {
      key: roll_number
  };
  let options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic NmRmNjY0YjctY2UzNy00N2NmLTg3MjktN2JmZjgxYTcwMDVlOnFEbmR6S3BWU0hmd1hTUjY3eUM4SkJuZ1ZWT1dZNU56SWZ0aVV0bFpyeWFFVmx3c1F1cFRHaUxHaVU3dmNVRVc='
      },
      body: JSON.stringify(data)
  };

  return fetch(url, options)
      .then(response => response.json())
      .then(result => {
          return result["array"];
      })
      .catch(error => {
          console.error('Error:', error);
          throw error;
      });
}

async function displaySearchResult(searchTerm) {
  sendMessage(searchTerm)
    .then(async result => { // Changed response to result here
        // Parse response data
        const data = result; // Changed response to result here

        // Display result
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        if (data) {
          const header = document.createElement('h3');
          header.innerText = `Results for ${searchTerm}:`;
          resultDiv.appendChild(header);

          const list = document.createElement('ul');
          data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
          });
          resultDiv.appendChild(list);
        } else {
          resultDiv.innerText = 'No matching value found';
        }
    })
    .catch(error => {
      console.error('Error fetching data:', error); // Changed response to error here
      // Display error message
      const resultDiv = document.getElementById('result');
      resultDiv.innerText = 'Error fetching data. Please try again later.';
    });
}
