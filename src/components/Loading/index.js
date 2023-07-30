import {Dna} from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div className="loader-container">
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div>
)

export default LoadingView