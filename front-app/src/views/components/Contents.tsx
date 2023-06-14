import React, { useEffect, useState } from 'react'
import { Box, Skeleton } from '@chakra-ui/react'
import { ContentsActions } from '../../actions/Contents'
import { ContentsProps } from '../@props/ContentsProps'

export type ContentProps = {
  currentContent: number
}

const Content: React.FC<ContentProps> = ({ currentContent }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [current, setCurrent] = useState<ContentsProps>()

  useEffect(() => {
    if (!currentContent) {
      return
    }

    setIsLoaded(false)
    fetchContentById(currentContent)
  }, [currentContent])

  const fetchContentById = async (id: number) => {
    const response: any = await ContentsActions().getById(id)
    response?.data?.content && setCurrent(response?.data?.content)
    setIsLoaded(true)
  }

  return (
    <Skeleton isLoaded={isLoaded}>
      <Box height="100%">
        {current && (
          <Box
            borderRadius={13}
            height="100%"
            bgImage={`url(${current.image_path})`}
            opacity={0.8}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
          >
            <Box
              borderRadius={13}
              height="100%"
              bgGradient="linear(to-b, rgba(0,0,0,0.5), rgba(0,0,0,0.5))"
            >
              <Box p={5}>
                <Box
                  color={'white'}
                  fontWeight={'bold'}
                  fontSize={'2xl'}
                  textShadow={'0 0 2px #000'}
                >
                  {current.title}
                </Box>
                <Box
                  color={'white'}
                  fontWeight={'bold'}
                  fontSize={'xl'}
                  textShadow={'0 0 2px #000'}
                >
                  {current.summary}
                </Box>
                <Box
                  color={'white'}
                  fontWeight={'bold'}
                  fontSize={'md'}
                  textShadow={'0 0 2px #000'}
                  textAlign={'justify'}
                  height={'65vh'}
                  overflowY={'auto'}
                  p={2}
                  dangerouslySetInnerHTML={{ __html: current.description }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Skeleton>
  )
}

export default Content
