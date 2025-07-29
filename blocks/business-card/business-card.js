export default function decorate(block) {
  //block.innerHTML = '';
  //const div = document.createElement('div');
  //div.innerHTML = 'Hi From the Div';
  //block.append(div);

  block.innerHTML = ''; // Clears the existing content of the block

    // Create the main container div
    const mainDiv = document.createElement('div');
    block.append(mainDiv);

    // ---
    // Create the form element
    const form = document.createElement('form');
    form.className = 'my-custom-form'; // Add a class for styling if needed

    // Add radio buttons with images
    const radioButtonsContainer = document.createElement('div');
    radioButtonsContainer.className = 'radio-buttons-container';

    // Example radio button 1
    const radio1Label = document.createElement('label');
    radio1Label.innerHTML = `
    <input type="radio" name="designOption" value="option1">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/Don%20Stolper.png?text=Image+1" alt="Design Option 1">
    <span>Option 1</span>
  `;
    radioButtonsContainer.append(radio1Label);

    // Example radio button 2
    const radio2Label = document.createElement('label');
    radio2Label.innerHTML = `
    <input type="radio" name="designOption" value="option2">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/Don%20Stolper.png??text=Image+2" alt="Design Option 2">
    <span>Option 2</span>
  `;
    radioButtonsContainer.append(radio2Label);

    // Example radio button 3
    const radio3Label = document.createElement('label');
    radio3Label.innerHTML = `
    <input type="radio" name="designOption" value="option3">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/Don%20Stolper.png??text=Image+3" alt="Design Option 3">
    <span>Option 3</span>
  `;
    radioButtonsContainer.append(radio3Label);

    // Example radio button 4
    const radio4Label = document.createElement('label');
    radio4Label.innerHTML = `
    <input type="radio" name="designOption" value="option4">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/Don%20Stolper.png??text=Image+4" alt="Design Option 4">
    <span>Option 4</span>
  `;
    radioButtonsContainer.append(radio4Label);

    form.append(radioButtonsContainer);

    // ---
    // Add a dropdown (select element)
    const dropdownLabel = document.createElement('label');
    dropdownLabel.textContent = 'Select a category:';
    const select = document.createElement('select');
    select.name = 'category';
    select.id = 'category-select';

    const option1 = document.createElement('option');
    option1.value = 'cat1';
    option1.textContent = 'Category 1';
    select.append(option1);

    const option2 = document.createElement('option');
    option2.value = 'cat2';
    option2.textContent = 'Category 2';
    select.append(option2);

    const option3 = document.createElement('option');
    option3.value = 'cat3';
    option3.textContent = 'Category 3';
    select.append(option3);

    dropdownLabel.append(select);
    form.append(dropdownLabel);

    // ---
    // Add the 'Preview' button
    const previewButton = document.createElement('button');
    previewButton.type = 'submit'; // Or 'button' if you handle submission with JS
    previewButton.textContent = 'Preview';
    previewButton.className = 'preview-button';
    form.append(previewButton);

    // Append the form to the block
    block.append(form);

    // You might want to add event listeners here for form submission or radio button changes
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Form submitted!');
        // Add your logic to handle the preview here
        const selectedOption = form.querySelector('input[name="designOption"]:checked');
        const selectedCategory = form.querySelector('#category-select');
        console.log('Selected Design:', selectedOption ? selectedOption.value : 'None');
        console.log('Selected Category:', selectedCategory.value);
    });
}
