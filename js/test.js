var input = document.getElementById('username_field');
var button = document.getElementById('validation_Username');

input.addEventListener('input', function() {
    if (this.value != "") {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
    });
    
