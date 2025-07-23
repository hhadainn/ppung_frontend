import MoonLoader from "react-spinners/MoonLoader";
import styled from 'styled-components';
import { Line } from 'rc-progress';

const Container = styled.div`
    position: ${props => props.absolute ? 'absolute' : 'fixed'};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 35000;
    flex-direction: column;

    .loading-spinner{
        width: 65px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 45px;
            height: 45px;
        }
        animation-name: spinner_rotation;
        animation-duration: .5s !important;
        animation-iteration-count: infinite !important;
        animation-timing-function: linear;
        @keyframes spinner_rotation{
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
            }
        }
    }
    .progress-bar-container{
        width: 30%;
        margin-top: 30px;
    }
`;

const Loading = ({loading = false, className='',label,  isProgress = false, percent = 0, absolute = false}) => {
    return(
        loading &&
        <Container absolute={absolute} className={className}>
            <MoonLoader
                color="#444"
            />
			{label && 
			<div className="text-[blue] text-[20px] mt-20">
				{label}
			</div>
			}
            {isProgress &&
            <div className="progress-bar-container">            
                <Line percent={percent} strokeWidth={3} strokeColor="#6695ce" />
            </div>
            }

        </Container>
    )
}
export default Loading