import { FormControl, FormLabel, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import { useState } from 'react';

const TextBox = (props) => {
  const [valueText, setValueText] = useState('');  
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const { param1, param2, param4, param6, secureEntry } = props;

  let handleTextChange = async (event) => {
    let text = event.target.value;
    await setValueText(text);
    console.log(props.param5 && !props?.param5?.regex?.test(text));
    if(props.param5 && !props?.param5?.regex?.test(text)){
      setError(!!props?.param5?.errorMessage);
      return setErrorMessage(props?.param5?.errorMessage);
    } else {
      setError('');
    }
    props.udpateTextValue(text);
  }

  return (
    <FormControl pb={4}>
      <FormLabel
        position="absolute"
        ml={5}
        mt={-2}
        px={1}
        backgroundColor="white"
        fontSize={{base: 'sm', md: "xs", lg: 'md', xl: 'md'}}
        fontWeight="medium"
        zIndex={1000}
      >
        {param1}
      </FormLabel>
      <Input
        mt={1}
        value={'' || props.param4}
        onChange={handleTextChange}
        type={secureEntry ? 'password' : 'text'}
        placeholder={ props.param2 || ''}
        readOnly={!!param6}
        borderRadius="xl"
        borderColor="gray.400"
        padding={4}
        fontSize="md"
        fontWeight="medium"
      />
      {error && <Text p={2} textColor={'red.500'} fontSize={'sm'} textAlign={'left'} w={'50%'}>{errorMessage}</Text>}
    </FormControl>
  );
};

export default TextBox;