// @ts-nocheck
import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import AdvancedOptions from '../../components/advanced_options.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import elemStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Checkbox, FormControlLabel } from '@material-ui/core';
import { Complete } from '../../components/complete.jsx';

function ReadOnlyTextField(props) {
  const OutputField = React.useRef(null);
  return <span ref={OutputField}><TextField noValidate multiline
    value={props.result}
    label={props.resLabel}
    onFocus={safeSelect}
    onClick={safeSelect}
    inputProps={{ readOnly: 'readonly' }}
    id="OutputField" /><Button style={{ marginTop: '10pt' }} color="default" onClick={() => {
      OutputField.current.firstChild.lastChild.firstChild.select();
      document.execCommand("Copy");
    }}>Copy to clipboard</Button></span>
}

function FieldWithPasteButton(props) {
  const Field = React.useRef(null);
  return <span ref={Field}>
    <TextField
      id="Text"
      label="Text to encrypt/decrypt"
      multiline
      rowsMax={8}
      value={props.text}
      onChange={(event) => {
        props.setText(event.target.value);
      }
      } />
    <Button style={{ marginTop: '16pt', marginLeft: '-5pt' }} tabIndex="-1" color="default" onClick={() => {
      Field.current.firstChild.lastChild.firstChild.select();
      props.setText('');
    }}>Clear</Button>
  </span>
}

async function safeSelect(event) {
  event.preventDefault();
  if (event.target.value !== '') {
    try {
      event.target.select();
    }
    catch (ignored) { }
  }
}

// Every module needs an About(props) function that returns a per-module about page
export function About(props) {
  const history = useHistory();
  return (
    <div className="pageContent about">
      <h1 style={{ marginBottom: '5pt' }}>135Cipher Information</h1>
      <Button variant="outlined" color="secondary" onClick={() => history.push(`/135cipher`)} style={{ marginBottom: "20pt" }}>135Cipher</Button><br />
      Initial Creation Date: 25/05/2020<br />
      Designed by: Jordan Amalfitano<br />
      <h2>Overview:</h2>
      <p>
        135Cipher is a symmetric algorithm created in Python that involves both transposition and shifting substitution steps.
        Whilst originally intended for English plain text encryption, the scope of this cipher expanded to allow for broader potential application.
        This encryption algorithm accepts all characters supported by utf-8 as input text and can support a decimal key up to 135 characters long.
        The security of this algorithm is unknown and untested. A simplified summary of how the algorithm works is illustrated within Figure 1, below.
      </p>
      <b>Figure 1:<br />Encryption Process Overview</b>
      <div className="box"><img alt="Encryption Process Overview" src="/135cipherInfo/figure_1.png" /></div>
      <h2>Base64 Encoding:</h2>
      <p>This cipher utilises utf-8 Base64 encoding to support virtually all inputs. An example of base64 encoding can be seen below in Figure 2.</p>
      <b>Figure 2:<br />Example Base64 Encoding:</b>
      <div className="box"><img alt="General Transposition" src="/135cipherInfo/figure_2.png" /></div>
      <p>Note: Base64 in this case is intended to allow support for non ASCII characters,
      which is not demonstrated in this example.
        The Python code implementation for this can be seen in Figure 3, below.</p>
      <b>Figure 3:<br />Base64 Encoding Code</b>
      <div className="box"><SyntaxHighlighter language="python" style={elemStyle}>
        {`\
        #Encode compressed text into Base64.
        encode_string = text.encode('utf-8')
        encoded_byte_string = base64.b64encode(encode_string)
        encoded_string = encoded_byte_string.decode('utf-8')`}
      </SyntaxHighlighter></div>
      <h2>Transposition:</h2>
      <p>This transpositional step is indicative of a matrix transposition and concerns the rearranging of the input.
        The part that matters in this algorithm is the method of grouping.
        By default, the input will be arranged into a matrix of two-character rows with as many columns as necessary.
        This is referred to as a General Transposition (seen in Figure 4), and is done unless the Random Transposition advanced option is enabled.</p>
      <b>Figure 4:<br />General Transposition:</b>
      <div className="box"><img alt="General Transposition" src="/135cipherInfo/figure_4.png" /></div>
      <p>
        The General Transposition, used by default, is intended to obscure patterns which may be present in the input text.
        This ensures the input text is generalised and is in theory more difficult to link back to any particular input.
        If during the General Transposition, the length of one row is shorter than the other,
        a ‘_’ (noise) will be appended to ensure both rows are of equal length.
      </p>
      <p>
        The Random Transposition is instead used if the random noise argument is enabled in the advanced options.
        The random noise transposition splits the text by randomly inserting “_”s into the input.
        These underscores are then used as breaking points for each column.
        Additional underscores are then appended to every row to ensure all rows are as long as the longest row.
        This adds noise, scrambles the order, and increases the input length,
        causing new unique shifting values to be calculated for all characters during the substitution step.
        This is intended to prevent any kind of dictionary attack by allowing many encrypted variants of the same input at the expense of greater length.
        Random transposition is illustrated in Figure 5.<br />

        Note: If random transposition is enabled for encryption,
        this option does not need to be enabled for decryption to succeed,
        as a minor key is appended which describes the number of rows that the text
        was grouped into for the transposition of the text (prior to substitution).
      </p>
      <b>Figure 5:<br />Random Transposition:</b>
      <div className="box"><img alt="General Transposition" src="/135cipherInfo/figure_5.png" /></div>
      <p>
        In Figure 6, you can see the Python code implementation of how the input text is split by the algorithm with respect to
        which transposition method is selected.
      </p>
      <b>Figure 6:<br />Transposition Grouping Code</b>
      <div className="box"><SyntaxHighlighter language="python" style={elemStyle}>{`\
    #Random insert spaces.
    if argument == '+':
        number_groups = random.randint(3, 15)
        for _ in range(number_groups):
            position = random.randint(1, len(input_text) - 2)
            split_text.insert(position, " ")
 
    #Regular insert spaces.
    if argument == '-':
        number_groups = 2
        split = int((len(input_text)) / number_groups)
        split_text.insert(split, " ")`}</SyntaxHighlighter></div>
      <h2>Substitution:</h2>
      <p>
        This is the both the most complex and important step within the algorithm.
        Like a standard substitution cipher, this step involves taking the position of a selected character in a sequence
        and shifting down the sequence by a value to find the replacement character.
        Whilst this simple concept is demonstrated in Figure 7, this algorithm has a more advanced implementation such that
        individual shifting values and shifting sequences are generated for every character. Additionally, the position
        of the previous replacement character impacts the shifting value for the next character.
      </p>
      <b>Figure 7:<br />Basic Substitution Example</b>
      <div className="box"><img alt="Basic Substitution Example" src="/135cipherInfo/figure_7.png" /></div>
      <p>Whilst a lot of this algorithm is built to leverage the Python Random standard library,
        the generation of shifting values instead relies on a complex implementation of the formula illustrated in Figure 8.<br />

        Note: Key refers to the input key for encryption/decryption (factor).
        Val refers to a position in a list, and Length refers to the total length of the shifting sequence (alpha_sequence_length).
        Additionally, the value is rounded to a whole number.
      </p>
      <b>Figure 8:<br />Shifting Formula</b>
      <div className="box"><img alt="Shifting Formula" src="/135cipherInfo/figure_8.png" /></div>
      <p>
        This same shifting formula implemented in Python code can be seen in Figure 9.
        Showing this function is important in order to allow proper explanation of the full shifting value calculation process,
        which involves code that refers to this function.
      </p>
      <b>Figure 9:<br />Python Shifting Formula</b>
      <div className="box"><SyntaxHighlighter language="python" style={elemStyle}>{`\
  #Define calculation function for use in factoring function.
  def calculation(factor, alpha_sequence_length, val):
 
    factor_differential = factor + 1
    calculation = 135
 
    calculation = int((val * factor) + (((val * factor_differential)
                  / alpha_sequence_length)) - (((10 * val) - 
                  (9 * val)) / (val / 6)))
    
    return calculation`}</SyntaxHighlighter></div>
      <p>
        The complete implementation of the number calculation within the algorithm can be broken down into two parts.
        Part one is illustrated in Figure 10, and shows the calculation of one very large number leveraging the pre-established shifting formula three times.
        Note: Primary Factor refers to the Factor (Key), and Secondary Factor refers to the Factor divided by four (Key/4).
      </p>
      <b>Figure 10:<br />Python Factoring Part One</b>
      <div className="box"><SyntaxHighlighter language="python" style={elemStyle}>{`\
    #Calculation
    for count in range(number_characters):
        #Complete calculations
        primary_calculation = calculation(primary_factor, 
                              alpha_sequence_length, 
                              count + 1)
        
        inverse_count = ((count - 1) % number_characters) + 1
 
        secondary_calculation = calculation(secondary_factor, 
                                alpha_sequence_length, 
                                inverse_count)
 
        combined_calculation = primary_calculation - 
                               secondary_calculation
        
        if combined_calculation == 0:
            combined_calculation = 1
 
        output_calculation = int(calculation(primary_factor, 
                             alpha_sequence_length, 
                             combined_calculation))`}</SyntaxHighlighter></div>
      <p>
        The large number calculated from part one is then taken and broken into two parts which are calculated together
        to produce a new number (magic_c), shown in Figure 11.
        A small part of this large number is cut off to be used as the final calculated shifting value.
        Then the final shifting value of the previous number (or 135 initially), is added to this number.
        Finally, the remainder of the number divided into the alpha sequence length (modulo operation) is found,
        to know the amount along the sequence the character should be shifted.
      </p>
      <b>Figure 11:<br />Python Factoring Part Two</b>
      <div className="box"><SyntaxHighlighter language="python" style={elemStyle}>
        {`\
        #Take parts of output calculation.
        magic_a = int(str(output_calculation)[-9:])
        magic_b = int(str(output_calculation)[:8])
        magic_c = ((magic_a * magic_b) + (primary_factor^2))
        magic_output = int(str(magic_c)[-9:])
 
        #Add previous output number to current value.
        combined_output = magic_output + previous_output
        
        #Find remainder.
        final_output =  combined_output % alpha_sequence_length
 
        #Obscure potential even/odd patterns.
        if count % 2 == 0:
            final_output = final_output + 1`}</SyntaxHighlighter></div>
      <p>
        This entire calculation process illustrated in Figures 10 and 11 is completed
        for every character in the input text (after the transposition stage).
        With each character, a new Val value is entered to ensure a new shifting value is
        generated despite the Key and Length values remaining unchanged.<br />
        In addition to the shifting value that is calculated for every character in the input,
        a unique sequence is generated for each character to shift along by the calculated value.
        To achieve this, the Python Random standard library is leveraged to seed a random
        re-arrangement of the pre-defined character_list, as shown in Figure 12.
      </p>
      <b>Figure 12:<br />Python Sequence Generator</b>
      <div className="box"><SyntaxHighlighter language="python" style={elemStyle}>
        {`\
#Use input to generate alphabetical sequence.
def generate_alpha_sequence(input):
    
    #List of all supported characters
    character_list = ['E', 'I', 'p', '7', '3', 'Q', 'V', 'A', '0', 
                     'm', 'j', 'x', 'v', 'J', '9', 'H', 'M', 'F', 
                     'f', 'T', 'n', 'D', 'S', '6', 'Y', 'k', '5', 
                     'o', '/', 'U', 'w', 'c', 'h', 'd', 'l', 'L', 
                     'z', 'X', '+', 's', 'R', 'g', 'b', 'r', 'O', 
                     '1', 'B', 'e', 'P', 'y', 'a', 'C', 't', 'Z', 
                     'K', 'W', 'i', 'N', '8', 'G', '=', 'u', '4', 
                     'q', '2']
 
    length = len(character_list)
 
    #Generation of seeded alphabetical sequence using input.
    random.seed(input)
    alphabetical_sequence = (random.sample(character_list, length))
 
    return alphabetical_sequence`}</SyntaxHighlighter></div>
      <p>
        In order for this sequence generator to work, a unique input argument must be
        provided for every sequence that needs to be generated (in this case one per character in the provided input text).
        To achieve this, the formula shown in Figure 13 is used.
        In this formula Key is the encryption/decryption key and count refers to the current character out of the total characters (“2” out of 25 for example).
      </p>
      <b>Figure 13:<br />Sequence Input Formula</b>
      <div className="box"><img alt="Sequence Input Formula" src="/135cipherInfo/figure_13.png" /></div>
      <p>
        With the shifting values and shifting sequences calculated for every character,
        the first shift will occur. The process is simple,
        the position of the selected character will be indexed in the calculated sequence for that character (number corresponding to position).
        Then the calculated shift value for the selected character will be added to the indexed position number
        as well as the new indexed position number of the previous character. This formula is shown in Figure 14.
      </p>
      <b>Figure 14:<br />New Position Formula:</b>
      <div className="box"><img alt="Sequence Input Formula" src="/135cipherInfo/figure_14.png" /></div>
      <p>
        Involving the index value of the previous new position in the calculation of the next new position ensures that
        any change in input (when using the same key), results in every character after that change being encrypted with new values.
        This means any change to the input always results in a newly calculated final character.
        Leveraging this fact, the position of the final character will be indexed for a secondary shift value
        in a sequence generated with the formula of Figure 13 where Count is equal to zero (base sequence).
        Then, every other character (except the final character),
        will be shifted along their respective calculated sequences by this secondary shift value.
        This completes the butterfly effect by ensuring any change in any part of the input results in a completely different
        encrypted output despite the Key value being the same. A summary of this two step shifting process can be found in Figure 15, below.
      </p>
      <b>Figure 15:<br />Shifting Process</b>
      <div className="box"><img alt="Sequence Input Formula" src="/135cipherInfo/figure_15.png" /></div>
      <h2>Summary</h2>
      <p>
        In summary, this is a symmetric and deterministic encryption algorithm with a built in butterfly effect
        such that any change of key or input completely changes the output.
        Given the deterministic nature of this algorithm, the transposition step can be made random to allow variation of output for the same key and input.
        The algorithm works by encoding an input, shuffling it through a half split two row transposition,
        then every character is shifted by an individually calculated shift list on an individually generated character sequence.
        Finally, all characters are shifted (except the last character) again on their same
        respective sequences by a set value given by the index of the final character.
        Even if the approach of this algorithm is ineffective, there may still be value
        in this kind of approach as generalised in Figure 16, below.
      </p>
      <b>Figure 16:<br />Generalised Process</b>
      <div className="box"><img alt="Sequence Input Formula" src="/135cipherInfo/figure_16.png" /></div>
      <p>
        As a first dive into Python coding and encryption, this was a very enjoyable project to work on.
        Though it should again be noted, the security of this algorithm is untested and has been created by a novice who is new to the field.
      </p>
      <p className="uncentred">Publication Date:	   		20/09/2020</p>
      <p className="uncentred">Date Last Modified:			11/12/2020</p>
    </div>
  );
}

export default function (props) {
  const { factor, content, result, loading, resLabel, classes, sendInput } = props.state;
  const [randomPattern, setRandomPattern] = useState(false);
  const history = useHistory();

  const send = (action) => result.set(sendInput(factor.value, content.value, action, "135cipher", result, loading.set, resLabel.set, [
    randomPattern ? '+' : '-'
  ]));

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>135Cipher</h1>
    <p className="smallText">Symmetric Encryption Algorithm</p>
    <Button variant="outlined" color="secondary" onClick={() => history.push(`/135cipher/about`)} style={{ marginBottom: "20pt" }}>About</Button>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={event => {
      send('encrypt');
      event.preventDefault();
    }}>
      <div>
        <TextField id="keyField" label="key" inputMode="numeric" value={factor.value} onChange={(event) => {
          if (event.target.value.length > 135) alert("Key must be up to 135 characters long.");
          else if (RegExp("^\\d*$").test(event.target.value))
            factor.set(event.target.value);
          else alert("You can only input a whole number as the key.");
        }} />
        <FieldWithPasteButton text={content.value} setText={content.set} />
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={event => send('encrypt')}>Encrypt</Button>
        <Button onClick={event => send('decrypt')}>Decrypt</Button>
      </ButtonGroup>
    </form>
    <Complete />
    <ReadOnlyTextField result={loading.value ? "Loading..." : result.value || ''} resLabel={resLabel.value} />
    <React.Fragment><br /><CircularProgress color="primary" className={loading.value ? null : "hidden"} /></React.Fragment>
    <AdvancedOptions>
      <FormControlLabel
        control={
          <Checkbox value={randomPattern} onChange={event => { setRandomPattern(!randomPattern); }} />
        }
        label="Random Noise Pattern"
      />
    </AdvancedOptions>
  </div>;
}