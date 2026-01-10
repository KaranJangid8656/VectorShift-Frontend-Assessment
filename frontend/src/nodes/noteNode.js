import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            title="Note"
            handles={[]}
        >
            <div>
                <textarea placeholder="Enter note..." style={{ width: '100%', height: '50px' }}></textarea>
            </div>
        </BaseNode>
    );
};
