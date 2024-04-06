import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RawFamilyMember, buildFamilyAndRelations, RawFamilyRelation } from './utils'
import { FamilyTree } from '.'
import rawFamily from '../../tests/family1.json'

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
    // Replace 'Member Name' with the name of a member you expect in the output
    const linkElement = screen.getByText(/Member Name/i)
    expect(linkElement).toBeInTheDocument()
  })
})
