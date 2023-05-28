const Hero = () => {
    return (
      <header className='w-full flex flex-col justify-center items-center'>

        <nav className='w-full flex justify-between items-center mb-10 pt-3'>

          <div className='flex items-center gap-3'>

            <img src="https://cdn-icons-png.flaticon.com/512/566/566463.png?w=740&t=st=1685271601~exp=1685272201~hmac=b49397e413686ab48a7f5596a8ee90e62cd3574b2da47bb02306c0a4a71f10c7" alt="logo" className='w-12 object-contain' />

            <span className='font-satoshi font-black orange_gradient text-2xl'>RapidSum</span>

          </div>

          <button type='button' onClick={() => window.open('https://github.com/SmeetChavan')} className='black_btn'>GitHub</button>

        </nav>

        <h1 className="head_text">
          Summarize articles with <br className='md:hidden'/>
          <span className='orange_gradient'>OpenAI GPT</span>
        </h1>

        <h2 className="desc">
          Experience the Revolution of RapidSum: Effortlessly Condense Complex Articles into Bite-sized Insights
        </h2>


      </header>
  )
}

export default Hero;