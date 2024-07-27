document.getElementById('download').addEventListener('click', () => {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const chunkSize = 1000;
            for (let i = 0; i < data.length; i += chunkSize) {
                const chunk = data.slice(i, i + chunkSize);
                createPDF(chunk, i / chunkSize + 1);
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
});

function createPDF(data, part) {
    const element = document.createElement('div');
    element.style.margin = '20px';
    element.style.fontFamily = 'Arial, sans-serif';
    data.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.textContent = `${user.id} - ${user.first_name} ${user.last_name} - ${user.email}`;
        element.appendChild(userDiv);
    });

    const opt = {
        margin: 1,
        filename: `user-list-part-${part}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
}

fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('user-list');
        data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
            userDiv.textContent = `${user.id} - ${user.first_name} ${user.last_name} - ${user.email}`;
            userList.appendChild(userDiv);
        });
    })
    .catch(error => console.error('Error fetching user data:', error));