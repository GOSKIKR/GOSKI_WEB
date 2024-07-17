const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-8 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">회사 정보</h2>
          <p>대표자: 김고스키</p>
          <p>주소: 서울시 강남구 역삼동 123-456</p>
          <p>사업자등록번호: 02-1234-5678</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-4">고객 센터</h2>
          <p>전화번호: 02-1234-5678</p>
          <p>이메일: smink95@naver.com</p>
          <p>© 2024 GOSKI. All rights reserved.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-4">정책 및 약관</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                이용약관
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                개인정보처리방침
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                사업자정보
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                환불정책
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                제휴문의
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                고객센터
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">
          주식회사 고스키는 통신판매중개사로서, 상품/거래정보 및 거래와 관련하여
          통신판매 당사자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해
          책임을 지지 않습니다. 상품 및 거래에 대한 정확한 정보는 해당
          판매자에게 직접 확인바랍니다.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
