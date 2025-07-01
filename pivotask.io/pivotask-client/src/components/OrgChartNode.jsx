// src/components/OrgChartNode.jsx
import React from 'react';

const OrgChartNode = ({ node, highlightedUserId }) => {
    if (!node) return null;
    const isHighlighted = node.id === highlightedUserId;
    return (
        <li className="relative">
            <div className="inline-block">
                <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg border-2 flex items-center gap-3 ${isHighlighted ? 'bg-indigo-100 border-indigo-500' : 'bg-bg-primary border-border-primary'}`}>
                        <img src={node.avatar} className="w-12 h-12 rounded-full" alt={node.name}/>
                        <div>
                            <p className="font-bold text-base text-text-primary">{node.name}</p>
                            <p className="text-sm text-text-muted">{node.title || node.role}</p>
                        </div>
                    </div>
                </div>
            </div>
            {node.children && node.children.length > 0 && (
                <ul className="pl-8">
                    {node.children.map(child => <OrgChartNode key={child.id} node={child} highlightedUserId={highlightedUserId} />)}
                </ul>
            )}
        </li>
    );
};
export default OrgChartNode;