import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const IntegrationNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            title="Integration"
            handles={[
                { type: 'source', position: Position.Right, id: 'trigger' }
            ]}
        >
            <div>
                <span>3rd Party App</span>
            </div>
        </BaseNode>
    );
};
