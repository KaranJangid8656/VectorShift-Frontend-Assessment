// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            <DraggableNode type='api' label='API' />
            <DraggableNode type='database' label='Database' />
            <DraggableNode type='transformation' label='Transform' />
            <DraggableNode type='note' label='Note' />
            <DraggableNode type='integration' label='Integration' />
        </div>
    );
};
