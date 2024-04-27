import { Button } from '@/components/ui/button';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import DefaultCard from '@/components/admin/DefaultCard';

const page = () => {

  const projects = [
    {
      title: 'Landing Page',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
      link: '/admin/projects'
    },
    {
      title: 'Admin Panel',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
      link: '/admin/projects'
    },
    {
      title: 'E-Commerce',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
      link: '/admin/projects'
    },
    {
      title: 'Blog',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
      link: '/admin/projects'
    },
    {
      title: 'Blog',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
      link: '/admin/projects'
    },
    {
      title: 'Blog',
      subtitle: 'Adrian Grahl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      counter: Math.round(Math.random() * 100),
      counterText: 'Tasks',
      link: '/admin/projects'
    },
  ]

  return (
    <div className='h-screen space-y-4'>
      <div id='toolbar' className='w-full flex gap-2 items-center bg-gray-200 rounded-md px-2 h-12'>
        <Button variant={'ghost'}>
          <FontAwesomeIcon icon={faPlusSquare} className='mr-2'/>
          Add project
        </Button>
      </div>
      <hr />
      <div id='projects-container' className='grid grid-cols-4 grid-rows-3 gap-4 rounded-md'>
        {projects.map((project, index) => (
          <DefaultCard key={index} title={project.title} subtitle={project.subtitle} description={project.description} counter={Math.round(Math.random() * 100)} counterText={project.counterText} link={project.link} />
        ))}
      </div>
    </div>
  )
}

export default page;
