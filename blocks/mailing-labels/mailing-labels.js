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

  // Helper function to create a person's selection card
  const createPersonCard = (name, imageUrl, value) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'person-selection-card';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'person-name';
    nameSpan.textContent = name;
    cardDiv.append(nameSpan);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    cardDiv.append(img);

    const label = document.createElement('label');
    label.className = 'radio-label';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'designOption';
    input.value = value;
    label.append(input);

    // Add click handler to the card to select the radio button
    cardDiv.addEventListener('click', () => {
      input.checked = true;
      // Trigger change event to update form completion status
      const event = new Event('change');
      input.dispatchEvent(event);
    });

    cardDiv.append(label);
    return cardDiv;
  };

  // Populate using the helper function
  radioButtonsContainer.append(createPersonCard(
    'Don Stolper',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Don Stolper-1',
    'ADBDEMO/Don Stolper-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Brian Stolper',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Brian%20Stolper?$Responsive$',
    'ADBDEMO/Brian Stolper-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Sharon Sullivan',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-1?$Responsive$',
    'Sharon Sullivan-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'William Frank',
    'https://s7d1.scene7.com/is/image/ADBDEMO/William Frank-1?$Responsive$',
    'ADBDEMO/William Frank-1',
  ));

  form.append(radioButtonsContainer);

  //---
  // Create the options div
  const formControlsDiv = document.createElement('div');
  formControlsDiv.className = 'form-controls';

  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';
  select.required = true;

  // First office option (selected by default)
  const option1 = document.createElement('option');
  option1.value = '123';
  option1.textContent = '123 Main Street';
  option1.selected = true; // Set as selected by default
  select.append(option1);

  // Second office option
  const option2 = document.createElement('option');
  option2.value = '424';
  option2.textContent = '424 Hadley Drive, Suite F';
  select.append(option2);

  dropdownLabel.append(select);
  formControlsDiv.append(dropdownLabel);

  // ---
  // Add Title and Designations

  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  titleLabel.textContent = 'Title: '; // Set label text
  const titleInput = document.createElement('input');
  titleInput.type = 'text'; // Set the type to 'text'
  titleInput.id = 'title'; // Optional: Set an ID
  titleInput.placeholder = 'Enter title here'; // Optional: Add a placeholder

  titleLabel.append(titleInput);
  formControlsDiv.append(titleLabel);

  //  ---
  // Add Designations
  // ChFC CLU CPCU
  const designationLabel = document.createElement('label');
  designationLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  designationLabel.textContent = 'Designation: '; // Set label text
  const designationInput = document.createElement('input');
  designationInput.type = 'text'; // Set the type to 'text'
  designationInput.id = 'title'; // Optional: Set an ID
  designationInput.placeholder = 'Enter title here'; // Optional: Add a placeholder

  designationLabel.append(designationInput);
  formControlsDiv.append(designationLabel);

  //  ---
  // Add Designations
  // ChFC CLU CPCU
  const licenseLabel = document.createElement('label');
  licenseLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  licenseLabel.textContent = 'License Number: '; // Set label text
  const licenseInput = document.createElement('input');
  licenseInput.type = 'text'; // Set the type to 'text'
  licenseInput.id = 'title'; // Optional: Set an ID
  licenseInput.placeholder = ''; // Optional: Add a placeholder

  licenseLabel.append(licenseInput);
  formControlsDiv.append(licenseLabel);

  // ---
  // Add the 'Preview' button
  const previewButton = document.createElement('button');
  previewButton.type = 'submit'; // Or 'button' if you handle submission with JS
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';

  formControlsDiv.append(previewButton);
  form.append(formControlsDiv);

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
    // console.log('Form submitted!')
    // Add your logic to handle the preview here
    const newLine = '%5Cline%20';
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = form.querySelector('#office-select');
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/mailing-standard?';
    const pictureURL = `$picture=${selectedOption.value}&`;
    let agentName = '$agentBlock=';
    let address = '$address=';
    let phoneNumber = '$phone=';
    let emailAddress = '$email=';
    let licenseNumber = licenseInput.value;
    let titleText = titleInput.value;
    const designationText = designationInput.value;
    if ((titleText !== '') && (designationText !== '')) {
      titleText += ` ${designationText}%5Cline%20`;
    } else if ((titleText !== '') && (designationText === '')) {
      titleText += '%5Cline%20';
    } else if ((titleText === '') && (designationText !== '')) {
      titleText += `${designationText}%5Cline%20`;
    }

    switch (selectedOffice.value) {
      case '123':
      // Code to execute if expression === value1
        address = '123 Main Street%5Cline%20St. Paul, MN 55112-9583%5Cline%20';
        break;
      case '424':
        // Code to execute if expression === value2
        address = '424 Hadley Drive%5Cline%20Suite F%5Cline%20St. Paul, MN 55112-9583%5Cline%20';
        break;
      default:
    }

    switch (selectedOption.value) {
      case 'ADBDEMO/William Frank-1':
        agentName += 'William Frank The Stolper Insurance Company%5Cline%20';
        phoneNumber = '727.789.1234%5Cline%20';
        emailAddress = 'wfrank@statefarm.com';
        break;
      case 'Sharon Sullivan-1':
        agentName += 'Sharon Sullivan The Stolper Insurance Company%5Cline%20';
        phoneNumber = '813.235.8521%5Cline%20';
        emailAddress = 'ssullivan@statefarm.com%5Cline%20';

        break;
      case 'ADBDEMO/Brian Stolper-1':
        agentName += 'Brian Stolper The Stolper Insurance Company%5Cline%20';
        phoneNumber = '404.87.5468%5Cline%20';
        emailAddress = 'bstolper@statefarm.com%5Cline%20';
        break;
      case 'ADBDEMO/Don Stolper-1':
        agentName += 'William Frank The Stolper Insurance Company%5Cline%20';
        phoneNumber = '305.348.9876%5Cline%20';
        emailAddress = 'dstolper@statefarm.com%5Cline%20';
        break;
      default:
        agentName = '';
        phoneNumber = '';
        emailAddress = '';
    }

    previewContainer.innerHTML = `<img src="${imageURL}${pictureURL}${agentName}${titleText}${address}${phoneNumber}${emailAddress}${licenseNumber}">`;
  });
}
