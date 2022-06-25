import { Col } from ".";

export default function InputGroup({ children, error, icon }: { children: React.ReactNode, error?: any, icon: React.ReactNode }) {
    return (
        <>
            <div>
                <label className="input-group" style={{ outline: '1px solid', outlineOffset: '3px', outlineColor: (error) ? '#ad3b2f' : 'transparent' }}>
                    <span>{icon}</span>
                    
                    {children}
                </label>
            </div>
            {error ? (<Col className="text-xs"> {error.message} </Col>) : null} 
        </>
    );
}
