export default function decorate(block) {
  block.innerHTML = ''; // Clears the existing content of the block

  // Create the main container div
  const mainDiv = document.createElement('div');
  block.append(mainDiv);

  // ---
  // Create the form element
  const form = document.createElement('form');
  form.className = 'my-custom-form';

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
    'Sharon Sullivan',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan?$Responsive$',
    'ADBDEMO/Sharon Sullivan',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Sharon Sullivan',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-3?$Responsive$',
    'ADBDEMO/Sharon Sullivan-3',
  ));
  radioButtonsContainer.append(createPersonCard(
    'Sharon Sullivan',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-1?$Responsive$',
    'ADBDEMO/Sharon Sullivan-1',
  ));
  radioButtonsContainer.append(createPersonCard(
    'No Picture',
    'https://s7d1.scene7.com/is/image/ADBDEMO/blank1?$Responsive$',
    'ADBDEMO/blank1',
  ));

  form.append(radioButtonsContainer);

  // ---
  // Add a dropdown (select element)
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
  option1.value = '1';
  option1.textContent = '541 S York Street, Elmhurst';
  option1.selected = true; // Set as selected by default
  select.append(option1);

  // Second office option
  const option2 = document.createElement('option');
  option2.value = '2';
  option2.textContent = '447 North York Street, Elmhurst';
  select.append(option2);

  dropdownLabel.append(select);
  formControlsDiv.append(dropdownLabel);

  // ---
  // Add Title
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  titleLabel.textContent = 'Title: '; // Set label text
  const titleInput = document.createElement('input');
  titleInput.type = 'text'; // Set the type to 'text'
  titleInput.id = 'title'; // Optional: Set an ID
  titleInput.placeholder = ''; // Optional: Add a placeholder

  titleLabel.append(titleInput);
  //formControlsDiv.append(titleLabel);

  //  ---
  // Add Designations
  // ChFC CLU CPCU
  const designationLabel = document.createElement('label');
  designationLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  designationLabel.textContent = 'Designation: '; // Set label text
  const designationInput = document.createElement('input');
  designationInput.type = 'text'; // Set the type to 'text'
  designationInput.id = 'designation'; // Optional: Set an ID
  designationInput.placeholder = ''; // Optional: Add a placeholder

  designationLabel.append(designationInput);
  formControlsDiv.append(designationLabel);

  //  ---
  // Add phone number
  const phoneLabel = document.createElement('label');
  phoneLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  phoneLabel.textContent = 'Phone: '; // Set label text
  const phoneInput = document.createElement('input');
  phoneInput.type = 'text'; // Set the type to 'text'
  phoneInput.id = 'phone'; // Optional: Set an ID
  phoneInput.placeholder = ''; // Optional: Add a placeholder

  phoneLabel.append(phoneInput);
  formControlsDiv.append(phoneLabel);

 //  ---
  // Add email
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  emailLabel.textContent = 'Email: '; // Set label text
  const emailInput = document.createElement('input');
  emailInput.type = 'text'; // Set the type to 'text'
  emailInput.id = 'email'; // Optional: Set an ID
  emailInput.placeholder = ''; // Optional: Add a placeholder

  emailLabel.append(emailInput);
  formControlsDiv.append(emailLabel);

  //  ---
  // Add license number
  const licenseLabel = document.createElement('label');
  licenseLabel.setAttribute('for', 'dynamicInput'); // Associate label with input
  licenseLabel.textContent = 'License Number: '; // Set label text
  const licenseInput = document.createElement('input');
  licenseInput.type = 'text'; // Set the type to 'text'
  licenseInput.id = 'license'; // Optional: Set an ID
  licenseInput.placeholder = ''; // Optional: Add a placeholder

  licenseLabel.append(licenseInput);
  formControlsDiv.append(licenseLabel);
  // ---
  // Add the 'Preview' button
  const previewButton = document.createElement('button');
  previewButton.type = 'submit';
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  previewButton.disabled = true; // Disabled by default (until image is selected)
  
  formControlsDiv.append(previewButton);
  form.append(formControlsDiv);

  // Append the form to the block
  block.append(form);

  // --
  // Add a preview area
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  block.append(previewContainer);

  // Create checkbox
  const termsLabel = document.createElement('label');
  termsLabel.setAttribute('for', 'checkbox'); // Associate label with input
  const approveDiv = document.createElement('div');
  approveDiv.className = 'form-controls';
  termsLabel.textContent = 'By clicking this checkbox, you approve the order as you have entered.   Press the Add to cart button to finish the process.';
  const approveCheckbox = document.createElement('input');
  approveCheckbox.type = 'checkbox';
  approveCheckbox.id = 'acceptCheckbox';
  
  // Create button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add to cart';
  addButton.style.display = 'none'; // Initially hidden
  addButton.className = 'preview-button';
  approveCheckbox.addEventListener('change', () => {
      addButton.style.display = approveCheckbox.checked ? 'block' : 'none';
    });
  termsLabel.appendChild(approveCheckbox);
  approveDiv.appendChild(termsLabel);
  approveDiv.appendChild(addButton);
  block.append(approveDiv);

  // Function to check if form is complete
  const checkFormCompletion = () => {
    const isImageSelected = form.querySelector('input[name="designOption"]:checked') !== null;
    const isOfficeSelected = select.value !== '';
    previewButton.disabled = !(isImageSelected && isOfficeSelected);
  };

  // Add event listeners for form changes
  form.querySelectorAll('input[name="designOption"]').forEach((radio) => {
    radio.addEventListener('change', checkFormCompletion);
  });

  select.addEventListener('change', checkFormCompletion);

  // Add event listener for form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = form.querySelector('#office-select');
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/business-card?';
    let pictureURL = '';

    if (selectedOption) {
      pictureURL = `$picture=${selectedOption.value}&`;
    }
    const newLine = '%5Cline%20';
    let agentName = '$text=Sharon Sullivan';
    let address = '';
    let designations = designationInput.value;
    let phoneNumber = phoneInput.value;
    let emailAddress = emailInput.value;
    let licenseNumber = licenseInput.value;

    if (designations != '') {
      agentName += newLine + designations;
    }

    switch (selectedOffice.value) {
      case '1':
        address = '541 S York Street' + newLine + 'Elmhurst, IL 60126';
        break;
      case '2':
        address = '447 North York Street' + newLine + 'Elmhurst, IL 60126';
        break;
      default:
        adress = "default";
    }
    agentName += newLine + address;

    if (phoneNumber !== ''){
        agentName += newLine + phoneNumber;
    }
    
     if (emailAddress !== ''){
        agentName += newLine + emailAddress;
    }
     
    if (licenseNumber !== ''){
        agentName += newLine + "License %23" + licenseNumber;
    }

    const finalURL = `${imageURL}${pictureURL}${agentName}`;
    previewContainer.innerHTML = `<img src="${finalURL}">`;
    previewContainer.style.display = 'block';
  });
}
