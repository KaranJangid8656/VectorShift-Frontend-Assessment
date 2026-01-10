import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            title="API"
            handles={[
                { type: 'target', position: Position.Left, id: 'request' },
                { type: 'source', position: Position.Right, id: 'response' }
            ]}
        >
            <div>
                <span>API Call</span>
            </div>
        </BaseNode>
    );
};
