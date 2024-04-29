import { Button } from '@/components/ui/button';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultCard from '@/components/admin/DefaultCard';

const page = () => {

  const projects = [
    {
      _id: "a67b1a3b3b73e6d1e0b4e",
      title: 'Landing Page',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b71e6d1e0b4e",
      title: 'E-commerce',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b7e6d1e05b4e",
      title: 'Blog',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b7e62d1e0b4e",
      title: 'Portfolio',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b7e6d15e0b4e",
      title: 'Admin Panel',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b7e16d1e0b4e",
      title: 'E-learning',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b72e6d1e0b4e",
      title: 'E-learning',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
    {
      _id: "a67b1a3b3b7e66d1e0b4e",
      title: 'E-learning',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
    },
  ]

  return (
    <>
      <div id='toolbar' className='w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12 '>
        <Button variant={'ghost'}>
          <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
          Add Client
        </Button>
      </div>
      <hr />
      <div id='projects-container' className='grid xl:grid-cols-4 grid-rows-3 gap-4 rounded-md lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 '>
        {projects.map((project, index) => (
          <DefaultCard key={index} title={project.title} subtitle={project.subtitle} description={project.description} counter={Math.round(Math.random() * 100)} counterText={project.counterText} link={`/projects/${project._id}`} />
        ))}
      </div>
    </>

  )
}

export default page;
