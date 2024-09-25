"use client";

import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Mail,
  Phone,
  Camera,
  FileVideo2,
  Video,
  FileSignature,
  ScanFace,
  Book,
  Map,
  WavesIcon,
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  icon: LucideIcon;
}

const tools: Tool[] = [
  { id: "email-check", name: "Email Check", icon: Mail },
  { id: "phone-check", name: "Phone Check", icon: Phone },
  { id: "audio-agreement", name: "Audio agreement", icon: WavesIcon },
  { id: "selfie-photo", name: "Selfie photo", icon: Camera },
  { id: "selfie-video", name: "Selfie Video", icon: Video },
  { id: "video-agreement", name: "Video agreement", icon: FileVideo2 },
  { id: "e-signature", name: "E-signature", icon: FileSignature },
  { id: "liveliness-check", name: "Liveliness Check", icon: ScanFace },
  { id: "document-upload", name: "Document Upload", icon: Book },
  { id: "location-intelligence", name: "Location Intelligence", icon: Map },
];

const SingleWorkflowPage: React.FC = () => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === "toolList" &&
      destination.droppableId === "dropZone"
    ) {
      const newTool = tools.find((tool) => tool.id === result.draggableId);
      if (newTool && !selectedTools.find((tool) => tool.id === newTool.id)) {
        setSelectedTools([...selectedTools, newTool]);
      }
    } else if (
      source.droppableId === "dropZone" &&
      destination.droppableId === "dropZone"
    ) {
      const reorderedTools = Array.from(selectedTools);
      const [removed] = reorderedTools.splice(source.index, 1);
      reorderedTools.splice(destination.index, 0, removed);
      setSelectedTools(reorderedTools);
    }
  };

  const availableTools = tools.filter(
    (tool) => !selectedTools.find((selected) => selected.id === tool.id)
  );

  useEffect(() => {
    console.log(selectedTools);
  }, [selectedTools]);

  const renderConfigPanel = () => {
    if (!activeToolId)
      return <p className="text-gray-500">Select a tool to configure</p>;

    const tool = selectedTools.find((t) => t.id === activeToolId);
    if (!tool) return <p className="text-red-500">Tool not found</p>;

    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {tool.name} Configuration
        </h3>
        <p>Configuration options for {tool.name} go here.</p>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-175px)] ">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full bg-card">
          {/* Left Sidebar */}
          <div
            className={`${
              leftSidebarOpen ? "w-[350px]" : "w-0"
            } transition-all duration-300 ease-in-out bg-card shadow-md overflow-hidden  h-full relative`}
          >
            <div className="absolute top z-10 bg-white w-full">
              <h2 className="text-xl font-bold mb-4">Tools</h2>
            </div>
            <div className="p-4  mt-6 overflow-y-auto h-full">
              <Droppable droppableId="toolList" isDropDisabled={true}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {availableTools.map((tool, index) => (
                      <Draggable
                        key={tool.id}
                        draggableId={tool.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-background p-3 mb-2 w-80 h-20 rounded shadow cursor-move"
                          >
                            {tool.name}
                            <tool.icon />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* Toggle Left Sidebar */}
          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="dark:bg-background dark:hover:bg-background/50 bg-gray-100 p-2 hover:bg-gray-200  focus:outline-none"
          >
            {leftSidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {/* Center Area */}
          <div className="flex-grow flex flex-col py-11 p-6 items-center  h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Customer Experience</h2>
            <div className="bg-card p-4 rounded-lg min-h-[200px]">
              {selectedTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveToolId(tool.id)}
                  className={`p-3 mb-2 w-80 h-20 rounded cursor-pointer shadow ${
                    activeToolId === tool.id
                      ? "border-blue-900 border"
                      : "bg-background border-red-800"
                  }`}
                >
                  {tool.name}
                </div>
              ))}
              <Droppable droppableId="dropZone">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`border-2 border-dashed rounded-lg p-4 mt-4 transition-colors w-[326px] h-24 mb-7 ${
                      snapshot.isDraggingOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <p className="text-gray-400 text-center">
                      {snapshot.isDraggingOver ? "Drop here" : "Drag here"}
                    </p>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* Right Sidebar */}
          <button
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            className="dark:bg-background dark:hover:bg-background/50 bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
          >
            {rightSidebarOpen ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          <div
            className={`${
              rightSidebarOpen ? "w-80" : "w-0"
            } transition-all duration-300 ease-in-out bg-card shadow-md  h-full overflow-y-auto`}
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Configuration</h2>
              {renderConfigPanel()}
            </div>
          </div>

          {/* Toggle Right Sidebar */}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SingleWorkflowPage;
