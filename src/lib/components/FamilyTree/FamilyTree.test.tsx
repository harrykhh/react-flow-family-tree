import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RawFamilyMember, buildFamilyAndRelations, RawFamilyRelation } from '../utils'
import { FamilyTree } from '.'
import rawFamily from '../../../test/family1.json'
// import ResizeObserver from 'resize-observer-polyfill'
// global.ResizeObserver = ResizeObserver
// Prepare the data
const [familyMembersRecord, familyRelationsRecord] = buildFamilyAndRelations(
  rawFamily.familyMembers as RawFamilyMember[],
  rawFamily.familyRelations as RawFamilyRelation[],
)
const rootMember = familyMembersRecord['3']

// Write the test
describe('renders FamilyTree correctly', () => {
  it('should render', async () => {
    const { getByText } = render(
      <FamilyTree
        familyMembers={familyMembersRecord}
        familyRelations={familyRelationsRecord}
        rootMember={rootMember}
      />,
    )
    const linkElement = screen.getByText(/Tracey/i)
    expect(linkElement).toBeInTheDocument()
  })
})
