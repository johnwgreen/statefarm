export default function decorate(block) {
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
    <input type="radio" name="designOption" value="ADBDEMO/Don Stolper-1">
    <img src="https://s7d1.scene7.com/is/image/ADBDEMO/Don Stolper-1" alt="Design Option 1">
    <span>Don Stolper</span>
  `;
  radioButtonsContainer.append(radio1Label);

  // Example radio button 2
  const radio2Label = document.createElement('label');
  radio2Label.innerHTML = `
    <input type="radio" name="designOption" value="ADBDEMO/Brian Stolper-1">
    <img src="https://s7d1.scene7.com/is/image/ADBDEMO/Brian%20Stolper?$Responsive$" alt="Design Option 2">
    <span>Brian Stolper</span>
  `;
  radioButtonsContainer.append(radio2Label);

  // Example radio button 3
  const radio3Label = document.createElement('label');
  radio3Label.innerHTML = `
    <input type="radio" name="designOption" value="Sharon Sullivan-1">
    <img src="https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-1?$Responsive$" alt="Design Option 3">
    <span>Sharon Sullivan</span>
  `;
  radioButtonsContainer.append(radio3Label);

  // Example radio button 4
  const radio4Label = document.createElement('label');
  radio4Label.innerHTML = `
    <input type="radio" name="designOption" value="ADBDEMO/William Frank-1">
    <img src="https://s7d1.scene7.com/is/image/ADBDEMO/William Frank-1?$Responsive$" alt="Design Option 4">
    <span>William Frank</span>
  `;
  radioButtonsContainer.append(radio4Label);

  form.append(radioButtonsContainer);

  // ---
  // Add a dropdown (select element)
  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';

  const option1 = document.createElement('option');
  option1.value = '123';
  option1.textContent = '123 Main Street';
  // St. Paul, MN 55112-9583
  // joe@joesmith.com
  select.append(option1);

  const option2 = document.createElement('option');
  option2.value = '424';
  option2.textContent = '424 Hadley Drive, Suite F';
  // Manhattan Beach, CA 90266-1671
  select.append(option2);

  dropdownLabel.append(select);
  form.append(dropdownLabel);

  // ---
  // Add Title and Designations 
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  titleLabel.textContent = 'Title: '; // Set label text
  const titleInput = document.createElement('input');
  titleInput.type = "text"; // Set the type to 'text'
  titleInput.id = "title"; // Optional: Set an ID
  titleInput.placeholder = "Enter title here"; // Optional: Add a placeholder
  form.append(titleLabel);
  form.append(titleInput);

  //  ---
  // Add Designations
  const designation1Label = document.createElement('label');
  designation1Label.setAttribute('for', 'dynamicInput'); // Associate label with input
  designation1Label.textContent = 'CCP: '; // Set label text
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox'; // Set the type to 'checkbox'
  checkbox.id = ''; // Optional: Set an ID
  checkbox.name = 'myCheckbox'; // Optional: Set a name
  checkbox.value = 'value1';
  form.append(checkbox);
  form.append(designation1Label);

  // ---
  // Add the 'Preview' button
  const previewButton = document.createElement('button');
  previewButton.type = 'submit'; // Or 'button' if you handle submission with JS
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  form.append(previewButton);

  // Append the form to the block
  block.append(form);

  // --
  // Add a preview area
  // Create an image element
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  const img = document.createElement('img');

  // Set the image source
  img.src = 'https://s7d1.scene7.com/is/image/ADBDEMO/mailing-standard?'; // Replace with your image URL

  // Set optional attributes (e.g., alt text, width, height)
  img.alt = 'Placeholder Image';
  img.width = 150;
  img.height = 150;
  previewContainer.append(img);
  block.append(previewContainer);

  // You might want to add event listeners here for form submission or radio button changes
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted!');
    // Add your logic to handle the preview here
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = form.querySelector('#office-select');
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/mailing-standard?';
    const pictureURL = `$picture=${selectedOption.value}&`;
    let agentName = '$name=';
    let address = '$address=';
    let phoneNumber = '$phone=';
    let emailAddress = '$email=';

    switch (selectedOffice.value) {
      case '123':
      // Code to execute if expression === value1
        address = '$address=123 Main Street&$city=St. Paul, MN 55112-9583&';
        break;
      case '424':
        // Code to execute if expression === value2
        address = '$address=424 Hadley Drive, Suite F&$city=&St. Paul, MN 55112-9583&';
        break;
      default:
    }

    switch (selectedOption.value) {
      case 'ADBDEMO/William Frank-1':
        agentName += 'William Frank&';
        phoneNumber += '727.789.1234&';
        emailAddress += 'wfrank@statefarm.com';
        break;
      case 'Sharon Sullivan-1':
        agentName += 'Sharon Sullivan&';
        phoneNumber += '813.235.8521&';
        emailAddress += 'ssullivan@statefarm.com';
        break;
      case 'ADBDEMO/Brian Stolper-1':
        agentName += 'Brian Stolper&';
        phoneNumber += '404.687.5468&';
        emailAddress += 'bstolper@statefarm.com';
        break;
      case 'ADBDEMO/Don Stolper-1':
        agentName += 'William Frank&';
        phoneNumber += '305.348.9876&';
        emailAddress += 'dstolper@statefarm.com';
        break;
      default:
        agentName = '&';
        phoneNumber = '&';
        emailAddress = '';
    }
    previewContainer.innerHTML = `<img src="${imageURL}${pictureURL}${agentName}${address}${phoneNumber}${emailAddress}">`;
  });
}
