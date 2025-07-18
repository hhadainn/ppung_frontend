import React from "react";
import '../../styles/main.scss'; // SCSS import

const Test = () => {
  return (
	<div className="test-background">
		<div className="menu-container">
			<h1 className="game-title">💨 방구를 뿌우웅</h1>
			<div className="menu-button">시작하기</div>
			<div className="menu-button">설정</div>
			<div className="menu-button">제작진</div>
			<div className="menu-button">종료</div>
		</div>
	</div>
  );
};

export default Test;
