export default  ()=> (
  <div className='z'>
      <h2>BackgroundSize with sprite image</h2>
      {[
          ['a',100],
          ['b',60],
          ['c',30],
          ['d','original'],
      ].map(([c,t])=><div className={'x'}>
          <h5>width:{t}</h5>
          <div className={c}/>
      </div>)}
  </div>
);