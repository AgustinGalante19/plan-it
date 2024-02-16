"use client"

import Button from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import BoardData from "../types/board-data"
import useBoardStore from "../../store/board-store"
import saveBoard from "../actions/save-board"

interface Props {
  initialState: BoardData
}

function ChangeObserver({ initialState }: Props) {
  const [hasChanges, setHasChanges] = useState(false)
  const [currentState, setCurrentState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { boardState } = useBoardStore()

  useEffect(() => {
    const listenChanges = () => {
      if (JSON.stringify(currentState) !== JSON.stringify(boardState)) {
        setHasChanges(true)
      } else {
        setHasChanges(false)
      }
    }
    listenChanges()
  }, [currentState, boardState])

  const handleSaveChanges = async () => {
    setIsLoading(true)
    await saveBoard(boardState.id, boardState)
    setIsLoading(false)
    setCurrentState(boardState)
  }

  return (
    <>
      {hasChanges && (
        <motion.div
          initial={{
            translateY: 400,
          }}
          animate={{
            translateY: 0,
            transition: {
              duration: 0.7,
              bounce: 0.5,
              type: "spring",
            },
          }}
          className={"w-full relative flex-col items-center h-full flex"}
        >
          <div className='flex w-[90%] self-center justify-between p-2 rounded-lg bg-primary bg-opacity-50 items-center'>
            <span className='font-semibold'>
              ❓ Changes have been detected, do yo want to save it?
            </span>
            <Button
              type='button'
              title='Save changes'
              onClick={handleSaveChanges}
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default ChangeObserver
