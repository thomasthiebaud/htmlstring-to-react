import * as React from 'react';
import { Config } from './config';
export interface AvailableProps {
    [keyof: string]: string | React.EventHandler<any> | any;
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
}
export declare function render(nodes: NodeListOf<Node & ChildNode>, options: Config): React.ReactNode[];
