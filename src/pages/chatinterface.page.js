import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Text,
  InputGroup,
  InputRightElement,
  HStack,
  VStack,
  Button,
  Icon,
  Flex,
  Avatar,
  Textarea,
  Spinner
} from '@chakra-ui/react';
import { Camera, Paperclip, Clock, Zap, MessageCircle } from 'lucide-react';
import promptService from '../service/prompt.service';
import ReactMarkdown from 'react-markdown';

const ChatInterface = ({ username }) => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState(null);
  const [conversation, setConversation] = useState([]);
  const conversationRef = useRef(null);


  const handleSendMessage = async () => {
    setChatHistory(inputText)
    setConversation(prevConversation => [...prevConversation, { user: inputText, llm: 'loading' }]);
  
    try {
      const response = await promptService.fetchPromptResposne(inputText);
      setConversation(prevConversation => prevConversation.map((turn, index) => {
        if (turn.user === inputText) {
          return { user: inputText, llm: response };
        }
        return turn;
      }));
      setInputText('');
    } catch (err) {
      console.log('error');
      alert('Something went wrong!');
    }
  }


  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);


  return (
    <Box bg="gray.900" maxh="100vh" className='flex' >
        <Box className='w-1/6 border-r border-gray-500 h-screen flex flex-col'>
          <Text fontSize="lg" color="white" m={6} className='text-left'>
            <Avatar name={username} size="sm" /> Hi, {username} !!
          </Text>
          <Button className='mt-auto p-4 m-4 bg-gray-500'>
            Log out
          </Button>
        </Box>

        <Box className='w-4/5 p-6 ' maxH="100vh" overflowY="hidden">
          <Box className='overflow-y-auto pr-4' maxH="calc(100vh - 140px)" pb={4} ref={conversationRef}>
            {conversation?.map((turn, index) => (
              <Box key={index} className='overflow-y-auto'>
                <Box className="mb-2 flex justify-end ">
                  <Text fontSize="lg" className='text-white mr-2 ml-10'>
                    {turn.user}
                  </Text>
                  <Avatar name={username} size="sm" />
                </Box>
                <Box className="text-white flex justify-start ">
                  <Avatar name={'a'} size="sm" />
                    {turn.llm === 'loading' ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      <ReactMarkdown className='ml-2 text-white mr-10 text-left text-lg'>{turn.llm}</ReactMarkdown>
                    )}
                </Box>
              </Box>
            ))}
          </Box>

          {!chatHistory && <HStack spacing={4} mb={8} flexWrap="wrap">
            <Button variant="ghost" size="sm" color="white">
              Polish your prose
            </Button>
            <Button variant="ghost" size="sm" color="white">
              Generate interview questions
            </Button>
            <Button variant="ghost" size="sm" color="white">
              Write a memo
            </Button>
          </HStack>}

          {!chatHistory && <VStack align="start"  spacing={6} color="white">
            <Text fontSize="lg">
              Welcome to Assistant.ai, your new powerful AI assistant built for work
              and trained to be safe, accurate, and secure. Use Assistant to:
            </Text>

            <VStack align="start" spacing={4} width="full">
              <Flex align="center" gap={3}>
                <Icon as={Clock} />
                <Text>Boost your productivity by tackling everyday tasks</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={Zap} />
                <Text>Spark your creativity with fresh ideas and perspectives</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={MessageCircle} />
                <Text>Expand your knowledge through in-depth discussions</Text>
              </Flex>
            </VStack>
          </VStack>}


          <Box className='bottom-0 fixed w-4/5' bg="gray.800" p={4} borderRadius="md" mb={6}>
            <InputGroup >
              <Textarea
                placeholder="Hi, how can i help you ?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
                    e.preventDefault(); // Prevent default Enter behavior
                    if (inputText.trim() !== '') { // Check if input is not empty
                      handleSendMessage();
                    }
                  }
                }}
                border="none"
                _placeholder={{ color: 'gray.500' }}
                color="white"
                overflow="hidden"
                overflowY='auto'
                size="xl"
                rows={1}
                maxRows={4}
              />
              <InputRightElement width="80px">
                <HStack spacing={3}>
                  <Icon as={Camera} color="gray.500" />
                  <Icon as={Paperclip} color="gray.500" />
                </HStack>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      
    </Box>
  );
};

export default ChatInterface;