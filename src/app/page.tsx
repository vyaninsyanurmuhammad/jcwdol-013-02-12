"use client";

import { getPostsThunk } from "@/redux/features/post-thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  Avatar,
  Button,
  Input,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.postReducer.posts);

  useEffect(() => {
    dispatch(getPostsThunk());
  }, [getPostsThunk]);

  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden bg-gray-950">
        <div className="w-full"></div>
        <div className="w-full h-full flex flex-col text-white border-x-[1px] border-gray-700 overflow-y-auto">
          <div className="h-12 border-b-[1px] border-gray-700 sticky top-0 z-10 bg-gray-950 flex shrink-0"></div>
          <div className="w-full h-fit flex flex-row border-b-[1px] border-gray-700">
            <Wrap className="p-4">
              <WrapItem>
                <Avatar
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                  size={"md"}
                />
              </WrapItem>
            </Wrap>
            <div className="flex flex-col gap-4 w-full h-fit py-4 pr-4">
              <Textarea
                border="none"
                placeholder="Apa yang hangat dibicarakan?"
                className="!p-4 !h-fit"
              ></Textarea>
              <div className="w-full flex justify-between">
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  hidden
                ></Input>
                <Button colorScheme={"transparent"}>
                  <ImageIcon size={24} />
                </Button>
                <Button className="w-fit" colorScheme={"blue"}>
                  Posting
                </Button>
              </div>
            </div>
          </div>
          <div>
            {appState.map((data, index) => (
              <div
                key={index}
                className="flex flex-row border-b-[1px] border-gray-700"
              >
                <Wrap className="p-4">
                  <WrapItem>
                    <Avatar
                      name="Kola Tioluwani"
                      src="https://bit.ly/tioluwani-kolawole"
                      size={"md"}
                    />
                  </WrapItem>
                </Wrap>
                <div className="flex flex-col gap-4 py-4 pr-4">
                  <div className="flex gap-2">
                    <span>Anonymous</span>
                    <span className="text-gray-600">@Anonymous</span>
                  </div>
                  <p>{data.message}</p>
                  {data.image ? (
                    <div className="relative w-full h-fit rounded-2xl border-[1px] border-gray-700 overflow-hidden">
                      <Image
                        className="object-fill !relative"
                        src={`https:${data.image.url}`}
                        alt={data.image.title}
                        fill
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full"></div>
      </div>
    </>
  );
}
